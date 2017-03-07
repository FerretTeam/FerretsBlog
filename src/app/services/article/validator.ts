import { Article } from './article';

export class Validator {
  constructor() {}

  checkArticle(article: Article) {
    // 文章元素的基础校验
    if (article.title == null || article.title == undefined ||
        article.tagName == null || article.tagName == undefined ||
        article.synopsis == null || article.synopsis == undefined ||
        article.contents == null || article.contents == undefined ||
        article.date == null || article.date == undefined)
      return '文章元素不存在';
    // 检查文章元素是否为空
    let reg = /[^\s]/g;
    let title = String(article.title).match(reg);
    let synopsis = String(article.synopsis).match(reg);
    let contents = String(article.contents).match(reg);
    if (title == null) return '文章标题不能为空';
    if (synopsis == null) return '文章摘要不能为空';
    if (contents == null) return '文章内容不能为空';

    // 检查文章的标签是不是为空
    if (article.tagName.length == 0) return '文章标签不能为空';
    for (let tag of article.tagName) {
      if (String(tag).match(reg).length <= 0) return '文章标签不能为空';
    }

    // 检查文章标签是否有重复
    if (article.tagName.length == 2 && article.tagName[0].localeCompare(article.tagName[1]) == 0)
      return '文章标签不能重复';
    if (article.tagName.length == 3 && (article.tagName[0].localeCompare(article.tagName[1]) == 0 ||
                                        article.tagName[0].localeCompare(article.tagName[2]) == 0 ||
                                        article.tagName[1].localeCompare(article.tagName[2]) == 0))
      return '文章标签不能重复';
    return '';
  }

}
