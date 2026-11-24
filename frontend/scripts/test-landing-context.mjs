import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { build } from 'esbuild';

// Render the real pages without a browser or network. These checks exercise the
// links emitted by shared navigation and the receiving form's selected values.
const bundle = await build({
  stdin: {
    contents: `
      import React from 'react';
      import { renderToStaticMarkup } from 'react-dom/server';
      import { StaticRouter } from 'react-router-dom/server';
      import { HelmetProvider } from 'react-helmet-async';
      import NavBar from './src/components/NavBar';
      import Residential from './src/pages/services/ResidentialAirDuctCleaning';
      import Commercial from './src/pages/services/CommercialAirDuctCleaning';
      import Managed from './src/pages/PropertyManagers';
      import Quote from './src/pages/Quote';
      const pages = { nav: NavBar, home: Residential, commercial: Commercial, managed: Managed, quote: Quote };
      export function render(page, location) {
        const context = {};
        const html = renderToStaticMarkup(React.createElement(HelmetProvider, { context },
          React.createElement(StaticRouter, { location }, React.createElement(pages[page]))));
        return { html, head: context.helmet.link.toString() };
      }
    `,
    resolveDir: process.cwd(),
    sourcefile: 'landing-context-fixture.ts',
    loader: 'ts',
  },
  bundle: true,
  write: false,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  define: { 'import.meta.env': '{}' },
});
const fixture = { exports: {} };
new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(createRequire(import.meta.url), fixture, fixture.exports);
const { render } = fixture.exports;
const decodeHref = html => [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1].replaceAll('&amp;', '&'));

for (const [name, page, path, property] of [
  ['commercial', 'commercial', '/services/commercial-air-duct-cleaning/', 'commercial'],
  ['managed property', 'managed', '/property-managers/', 'managed'],
  ['home', 'home', '/services/residential-air-duct-cleaning/', 'home'],
  ['estate', 'home', '/services/residential-air-duct-cleaning/?property=estate', 'estate'],
]) {
  test(`${name} landing keeps the ad intent in desktop/mobile navigation and the quote form`, () => {
    const expected = `/quote/?service=air-duct&property=${property}#estimate-builder`;
    const navLinks = decodeHref(render('nav', path).html).filter(href => href.startsWith('/quote/'));
    assert.deepEqual(navLinks, [expected, expected]);
    const landing = render(page, path);
    assert.ok(decodeHref(landing.html).filter(href => href === expected).length >= 3);
    assert.equal([...landing.html.matchAll(/<h1[ >]/g)].length, 1);
    const quote = render('quote', expected).html;
    const selected = [...quote.matchAll(/<label[^>]*><input([^>]+)\/><span>([^<]+)<\/span><\/label>/g)]
      .filter(match => /checked=""/.test(match[1])).map(match => match[2]);
    const labels = { home: 'Home / apartment', commercial: 'Business / commercial', managed: 'Managed property / HOA', estate: 'Private home / estate' };
    assert.ok(selected.includes(labels[property]), `${property} should be selected in the receiving estimate`);
  });
}

test('estate information remains visible on the canonical home page and estate uses the same canonical', () => {
  const home = render('home', '/services/residential-air-duct-cleaning/');
  const estate = render('home', '/services/residential-air-duct-cleaning/?property=estate');
  for (const { html } of [home, estate]) {
    assert.match(html, /id="managed-home-heading"/);
    assert.match(html, /Map the systems/);
    assert.match(html, /Confirm the right contact/);
    assert.match(html, /Plan access &amp; timing/);
    assert.match(html, /Agree the completion record/);
  }
  assert.match(estate.html, /<h1>Air Duct Cleaning for Los Angeles Homes &amp; Estates<\/h1>/);
  assert.equal(estate.head, home.head);
  assert.match(estate.head, /href="https:\/\/www\.pureaircalifornia\.com\/services\/residential-air-duct-cleaning\/"/);
});

test('managed property inline request uses the managed property selection', () => {
  const { html } = render('managed', '/property-managers/');
  assert.match(html, /<option selected="">Managed property \/ HOA<\/option>/);
  assert.doesNotMatch(html, /maintain clean, healthy air/);
});

test('unexpected query values cannot change quote destination or become page content', () => {
  const { html } = render('nav', '/services/commercial-air-duct-cleaning/?property=__proto__&service=https://outside.test');
  const links = decodeHref(html).filter(href => href.startsWith('/quote/'));
  assert.deepEqual(links, Array(2).fill('/quote/?service=air-duct&property=commercial#estimate-builder'));
  assert.doesNotMatch(html, /outside\.test|__proto__/);
});
