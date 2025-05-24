import * as cmd from "commander";

export function main() {
  const program = new cmd()

  program
    .name('eat')
    .description('A simple bundler CLI')
    .version("1.0.0")

  program
    .cmd('build')
    .description('构建项目')
    .action(() => {
      console.log('🛠️ 正在构建')
    })

  program.parse()
}
