// https://github.com/asciidoctor/asciidoctor.js
// https://asciidoctor-docs.netlify.com
// https://asciidoctor.org

import asciidoctor from '@asciidoctor/core'
import { join } from 'node:path';
import kroki from 'asciidoctor-kroki';

const adoc = asciidoctor();
console.log(`Asciidoctor.js ${adoc.getVersion()}`);

kroki.register(adoc.Extensions);

const options = {
    safe: 'safe',
    attributes: { linkcss: true },
    base_dir: 'docs',
    to_dir: 'html',
    mkdirs: true,
};
adoc.convertFile(
    join('docs', 'projekthandbuch.adoc'),
    options,
);