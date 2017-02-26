import { Component, OnInit } from '@angular/core';
import * as marked from 'marked';
import highlightjs from 'highlight.js';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  check: boolean
  middle: string

  constructor() {
    this.check = false;
    // 设定 marked 的参数
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
      const validLang = !!(language && highlightjs.getLanguage(language));
      const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    };

    marked.setOptions({ renderer });
  }

  ngOnInit() {
  }

  contentChange() {
    this.check = !this.check;
    document.getElementById('content-after').innerHTML = marked((<HTMLInputElement>document.getElementById('content-before')).value);
  }


}
