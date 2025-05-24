# eatjs


# goals
了解构建过程

# modules
graph
    - creategraph 构建依赖图
    - resolve 路径解析
parser
    - parse 分析esm
    - extractdep 提取以来信息
transform
    - transpile 转译
    - loaders json, .css
bundler
    - bundle 生成最终输出代码（类似 webpack runtime）
    - output 写入 dist 目录, 生成srcmap
runtime
    - template 运行代码模版

plugins

utils
    - 通用工具
