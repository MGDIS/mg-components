import { h } from "@stencil/core";

export default {
  title: 'Style/Layout/Grid',
};

const demoCss = `.mg-grid { margin-top: 1rem; }
.mg-grid__col { border: 1px solid rgba(0, 0, 0, 0.1); background-color: rgba(0, 0, 0, 0.05); padding-top: 1.5rem; padding-bottom: 1.5rem; }`;

const Template = () => (
  <main>
    <style>{demoCss}</style>

    <h1>Grid</h1>

    <p>You can use grid classes by using the <code>.mg-grid</code> class in the container. This call will add flex properties to the container.</p>

    <h2>Auto layout</h2>

    <p>Default column class is <code>mg-grid__col</code>. The width will be defined by the number of element using the class.</p>

    <div class="mg-grid">
      <div class="mg-grid__col">.mg-grid__col</div>
      <div class="mg-grid__col">.mg-grid__col</div>
    </div>

    <div class="mg-grid">
      <div class="mg-grid__col">.mg-grid__col</div>
      <div class="mg-grid__col">.mg-grid__col</div>
      <div class="mg-grid__col">.mg-grid__col</div>
    </div>

    <div class="mg-grid">
      <div class="mg-grid__col">.mg-grid__col</div>
      <div class="mg-grid__col">.mg-grid__col</div>
      <div class="mg-grid__col">.mg-grid__col</div>
      <div class="mg-grid__col">.mg-grid__col</div>
      <div class="mg-grid__col">.mg-grid__col</div>
    </div>

    <h2>Sized column</h2>

    <p>Like Bootstrap, you can use sized colomn based on a 12 colomns grid.</p>
    <p>The library is using the BEM methodology, so to define a column width we need to set a modifier class, for exemple <code>mg-grid__col-2</code>.</p>

      {[...Array.from(Array(12).keys())].map((_e, i) =>
          (<div class="mg-grid">
           <div class={`mg-grid__col mg-grid__col-${i+1}`}>.mg-grid__col.mg-grid__col-{i+1}</div>
          </div>)
      )}

      <h2>Mix</h2>

      <p>You can also mix unsized column with sized column.</p>

      <div class="mg-grid">
        <div class="mg-grid__col mg-grid__col-3">.mg-grid__col.mg-grid__col-3</div>
        <div class="mg-grid__col">.mg-grid__col</div>
        <div class="mg-grid__col mg-grid__col-3">.mg-grid__col.mg-grid__col-3</div>
    </div>

    <div class="mg-grid">
        <div class="mg-grid__col">.mg-grid__col</div>
        <div class="mg-grid__col mg-grid__col-5">.mg-grid__col.mg-grid__col-5</div>
        <div class="mg-grid__col">.mg-grid__col</div>
    </div>
  </main>
);

export const Grid = Template.bind({});
Grid.args = {};
