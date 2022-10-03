export function render(template: string, vars: any): string {
  const regexp = /<<(.*?)>>|\{\{(.*?)\}\}/;
  return template
    .split('\n')
    .map(function (line) {
      for (let match = line.match(regexp), result; match; ) {
        if (match[0][0] === '<') {
          console.log('match <');
        } else {
          result = vars[match[2].trim()];
        }
        line = line.replace(match[0], result ? result : '');
        match = line.match(regexp);
      }
      return line;
    })
    .join('\n');
}
