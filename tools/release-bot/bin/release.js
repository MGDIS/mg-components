#! /usr/bin/env node

const axios = require('axios');
const showdown = require('showdown');

const converter = new showdown.Converter();

/**
 * Extract version changelog and publish it into a MS Teams chan
 */
(async function run() {
  if (!process.env.TEAMS_WEBHOOK_URL || !process.env.CI_JOB_TOKEN) {
    console.error('FATAL - Missing environment variable');
    process.exit(1);
  }

  const webhookUrl = TEAMS_WEBHOOK_URL;

  const { data: gitlabTags } = await axios({
    method: 'GET',
    url: 'https://gitlab.mgdis.fr/api/v4/projects/1968/repository/tags',
    headers: {
      'PRIVATE-TOKEN': process.env.CI_JOB_TOKEN,
    },
  });

  const lastTag = gitlabTags[0];
  const version = lastTag.release.tag_name;
  const changelog = `${lastTag.release.description}\r\n\r\n[View the complete changelog file](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/tags/${version})`;

  const message = {
    title: `Nouvelle version de MG Components (${version})`,
    text: converter.makeHtml(changelog).replace('\u2026', '...').replace(/\n/g, ''),
  };

  await axios({
    method: 'POST',
    url: webhookUrl,
    data: message,
  });
})();
