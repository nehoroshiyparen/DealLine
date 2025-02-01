export const htmlToMarkdown = (html: string): string => {
    let markdown = html;

    // Исправляем кодовые блоки <pre class="ql-syntax">...</pre>
    markdown = markdown.replace(/<pre class="ql-syntax"[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => {
        return `\n\`\`\`\n${code.trim()}\n\`\`\`\n`;
    });

    // Инлайновый код `код`
    markdown = markdown.replace(/<code>(.*?)<\/code>/gi, '`$1`');

    // Остальные теги
    markdown = markdown.replace(/<br\s*\/?>/gi, '  \n');
    markdown = markdown.replace(/<p>(.*?)<\/p>/gi, '\n$1\n');
    markdown = markdown.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
    markdown = markdown.replace(/<b>(.*?)<\/b>/gi, '**$1**');
    markdown = markdown.replace(/<em>(.*?)<\/em>/gi, '*$1*');
    markdown = markdown.replace(/<i>(.*?)<\/i>/gi, '*$1*');
    markdown = markdown.replace(/<u>(.*?)<\/u>/gi, '__$1__');
    markdown = markdown.replace(/<s>(.*?)<\/s>/gi, '~~$1~~');
    markdown = markdown.replace(/<del>(.*?)<\/del>/gi, '~~$1~~');
    markdown = markdown.replace(/<h1>(.*?)<\/h1>/gi, '# $1');
    markdown = markdown.replace(/<h2>(.*?)<\/h2>/gi, '## $1');
    markdown = markdown.replace(/<h3>(.*?)<\/h3>/gi, '### $1');
    markdown = markdown.replace(/<h4>(.*?)<\/h4>/gi, '#### $1');
    markdown = markdown.replace(/<h5>(.*?)<\/h5>/gi, '##### $1');
    markdown = markdown.replace(/<h6>(.*?)<\/h6>/gi, '###### $1');
    markdown = markdown.replace(/<ul>(.*?)<\/ul>/gi, '$1');
    markdown = markdown.replace(/<ol>(.*?)<\/ol>/gi, '$1');
    markdown = markdown.replace(/<li>(.*?)<\/li>/gi, '- $1');
    markdown = markdown.replace(/<a\s+href="(.*?)".*?>(.*?)<\/a>/gi, '[$2]($1)');
    markdown = markdown.replace(/<img\s+src="(.*?)".*?alt="(.*?)".*?>/gi, '![$2]($1)');
    markdown = markdown.replace(/<[^>]+>/g, '');

    return markdown.trim();
};
