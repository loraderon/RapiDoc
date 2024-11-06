import { html } from 'lit-element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js'; // eslint-disable-line import/extensions
import { marked } from 'marked';

/* eslint-disable indent */
function headingRenderer(extension) {
  const renderer = new marked.Renderer();
  renderer.heading = (text, level, raw, slugger) => `<h${level} class="${level <= 2 ? 'observe-me' : ''}" id="${extension}--${slugger.slug(
      raw,
    )}">${text}</h${level}>`;
  return renderer;
}

export function extensionSectionTemplate(extensionSection) {
  if (!extensionSection) return '';

  if (typeof extensionSection === 'string') {
    const filtered = this.resolvedSpec.extensionSections.filter(
      (e) => e.name === extensionSection,
    );
    if (filtered.length > 0) extensionSection = filtered[0];
    else return '';
  }

  return html`
    <section
      id="${extensionSection.name}"
      class="observe-me ${this.renderStyle === 'view'
        ? 'section-gap'
        : 'section-gap--read-mode'}"
      style="border-top:1px solid var(--primary-color);"
    >
      ${extensionSection.headers.length === 0
        ? html`<h1>
            ${extensionSection.name.replace('x-section-', '')}
          </h1>`
        : ''}
      <slot name="${extensionSection.name}"></slot>
      <div id="api-${extensionSection.name}">
        ${html`${unsafeHTML(`
            <div class="m-markdown regular-font">
            ${marked(
              extensionSection.description,
              this.infoDescriptionHeadingsInNavBar === 'true'
                ? { renderer: headingRenderer(extensionSection.name) }
                : undefined,
            )}
          </div>`)}`}
      </div>
    </section>
  `;
}

export function extensionSectionsTemplates() {
  const { extensionSections } = this.resolvedSpec;
  if (!extensionSections?.length) return '';
  return html`${extensionSections.map((extensionSection) => extensionSectionTemplate.call(this, extensionSection))}`;
}
/* eslint-enable indent */
