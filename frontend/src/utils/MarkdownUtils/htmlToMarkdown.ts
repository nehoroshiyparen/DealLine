export const htmlToMarkdown = (html: string): string => {
    // Убираем лишние пробелы и переносы строк
    let markdown = html.trim();

    // Обрабатываем кодовые блоки <pre class="ql-syntax">
    markdown = replaceCodeBlocks(markdown);

    // Обрабатываем инлайновый код
    markdown = replaceInlineCode(markdown);

    // Обрабатываем разрывы строк
    markdown = replaceLineBreaks(markdown);

    // Обрабатываем базовые теги форматирования
    markdown = replaceBasicFormatting(markdown);

    // Обрабатываем заголовки
    markdown = replaceHeadings(markdown);

    // Обрабатываем списки
    markdown = replaceLists(markdown);

    // Обрабатываем ссылки
    markdown = replaceLinks(markdown);

    // Обрабатываем картинки
    markdown = replaceImages(markdown);

    // Убираем остальные HTML-теги
    markdown = removeRemainingTags(markdown);

    markdown = decodeHtmlEntities(markdown);

    markdown = markdown.replace(/<u>(.*?)<\/u>/gi, '<u>$1</u>');

    return markdown.trim();
};

// Вспомогательные функции для обработки отдельных элементов

const replaceCodeBlocks = (markdown: string): string => {
    return markdown.replace(/<pre class="ql-syntax"[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => {
        return `\n\`\`\`\n${code.trim()}\n\`\`\`\n`;
    });
};

const replaceInlineCode = (markdown: string): string => {
    return markdown.replace(/<code>(.*?)<\/code>/gi, '`$1`');
};

const replaceLineBreaks = (markdown: string): string => {
    return markdown.replace(/<br\s*\/?>/gi, '  \n');
};

const replaceBasicFormatting = (markdown: string): string => {
    const replacements: [RegExp, string][] = [
        [/<p>(.*?)<\/p>/gi, '\n$1\n'], // Абзацы
        [/<strong>(.*?)<\/strong>/gi, '**$1**'], // Жирный текст
        [/<b>(.*?)<\/b>/gi, '**$1**'], // Жирный текст
        [/<em>(.*?)<\/em>/gi, '*$1*'], // Курсив
        [/<i>(.*?)<\/i>/gi, '*$1*'], // Курсив
        [/<u>(.*?)<\/u>/gi, '<u>$1</u>'], // Подчёркнутый текст (HTML)
        [/<s>(.*?)<\/s>/gi, '~~$1~~'], // Зачёркнутый текст
        [/<del>(.*?)<\/del>/gi, '~~$1~~'], // Зачёркнутый текст
    ];

    replacements.forEach(([regex, replacement]) => {
        markdown = markdown.replace(regex, replacement);
    });

    return markdown;
};

const replaceHeadings = (markdown: string): string => {
    const headings: [RegExp, string][] = [
        [/<h1>(.*?)<\/h1>/gi, '\n# $1\n'],
        [/<h2>(.*?)<\/h2>/gi, '\n## $1\n'],
        [/<h3>(.*?)<\/h3>/gi, '\n### $1\n'],
        [/<h4>(.*?)<\/h4>/gi, '\n#### $1\n'],
        [/<h5>(.*?)<\/h5>/gi, '\n##### $1\n'],
        [/<h6>(.*?)<\/h6>/gi, '\n###### $1\n'],
    ];

    headings.forEach(([regex, replacement]) => {
        markdown = markdown.replace(regex, replacement);
    });

    return markdown;
};

const replaceLists = (markdown: string): string => {
    // Обрабатываем ненумерованные списки
    markdown = markdown.replace(/<ul>([\s\S]*?)<\/ul>/gi, (_, content) => {
        return processListItems(content, '-');
    });

    // Обрабатываем нумерованные списки
    markdown = markdown.replace(/<ol>([\s\S]*?)<\/ol>/gi, (_, content) => {
        return processListItems(content, '1.');
    });

    return markdown;
};

const processListItems = (content: string, prefix: string): string => {
    // Обрабатываем каждый элемент списка
    return content.replace(/<li>([\s\S]*?)<\/li>/gi, (_, itemContent) => {
        // Убираем лишние пробелы и переносы строк
        itemContent = itemContent.trim();

        // Обрабатываем вложенные списки
        if (/<(ul|ol)>/.test(itemContent)) {
            itemContent = replaceLists(itemContent);
        }

        // Добавляем префикс (маркер или номер) к элементу списка
        return `${prefix} ${itemContent}\n`;
    });
};

const replaceLinks = (markdown: string): string => {
    return markdown.replace(/<a\s+[^>]*href="(.*?)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
};

const replaceImages = (markdown: string): string => {
    // Обрабатываем картинки с alt-текстом
    markdown = markdown.replace(/<img\s+[^>]*src="(.*?)"[^>]*alt="(.*?)"[^>]*>/gi, '![$2]($1)');

    // Обрабатываем картинки без alt-текста
    markdown = markdown.replace(/<img\s+[^>]*src="(.*?)"[^>]*>/gi, '![]($1)');

    return markdown;
};

const removeRemainingTags = (markdown: string): string => {
    return markdown.replace(/<[^>]+>/g, '');
};

const decodeHtmlEntities = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
};