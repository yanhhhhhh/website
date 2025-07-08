## 启动

### 安装依赖

```bash
pnpm i
```

```

pnpm run dev
```

## SVG 组件使用说明

- 在 components 中有 icons 文件夹，将 svg 放入文件夹 icon-svg 中，会自动将改 svg 上的 fill 颜色去除，当不需要去除 svg 上的颜色时，请放入 icon-image 文件夹。
  放置完毕后运行指令
  pnpm run build:icon
- 指令运行完毕之后，即可在各个地方使用， 例如
  /src/pages/xxx/index.tsx
  import Icon from '@/components/icons'
  ```
  function App () {
  return (
  <Icon name="bin"></Icon>
   <Icon
                      name="aiVideo"
                      style={{ color: '#44FFF1' }}
                    ></Icon>
  )
  }
  ```
- 组件 props 中的 name 值，在 icon-svg 文件夹下的 svg 文件， name 为文件名，在 icon-image 文件夹下的 svg 文件， name 为 image-[文件名]，所有文件名均不包含文件后缀名。

## 国际化

### I18n 注意事项

1. 1.json 文件中嵌套不超过两层 key **（后端只支持两层）**，即

```json
 "welcome": "欢迎",
  "currencySign": "￥",
  "button": {
    "subscribeNow": "立即订购",
    "learnMore": "了解更多",
    "restoreTheInitialViewpoint": "还原初始视角",
    "UseOfSolarEnergyDuringTheDay": "白天使用太阳能",
    "BlackoutPeriod": "停电时段"
  },

```

**不支持**

```json 如下
 "specificities": {
    "specificitiesOne": {
      "title": "小巧够用",
      "decs": ""
    },
    "specificitiesTwo": {
      "title": "不依赖电网",
      "decs": ""
    }
  },


```

2. key 不要以数字、特殊符号命名,尽量语义化，以下都是错误 ❎ 的命名

```json
{
  "1kWh": "1kWh",
  "220VACOutput": "Output 200V AC",
  "220VACInputPhotovoltaicCharging": "220V AC input/photovoltaic charging",
  "293*288*155mm": "293*288*155mm",
  "8KG": "8KG",
  "1kWh": "1kWh",
  "200W": "200W",
  "IP43": "IP43",
  "0°C-45°C": "0°C-45°C",
  "2278±2mmX1134±2mmX30±1mm": "2278±2mmX1134±2mmX30±1mm",
  "27.3KG": "27.3KG",
  "144(6X24)": "144(6X24)",
  "530W": "530W",
  "0~+5W": "0~+5W"
}
```

### I18n 使用说明

`pnpm run downloadI18n`, 会自动下载最新的国际化文件，方便本地调试

`pnpm run build:locales`, 会自动将国际化文件转换成变量，放入`/src/constants/locales.ts`文件夹下

## 分支说明

- develop 分支为开发分支，用于开发新功能
- test 分支为测试分支，用于测试新功能
- uat 分支为预发布分支，用于预发布新功能
  注意事项：
  > 1. releaseV0.1 移动端是按照 414 的设计稿适配
  > 2. releaseV1.2 以及之后的迭代 移动端是按照 750 的设计稿适配
- releaseV1.2 该版本分支包含新闻资讯、产品中心、解决方案、关于我们、联系我们等页面
- releaseV0.1 当前线上版本分支（https://hero.hithium.com/）

## 适配

1. 移动端适配 750px 设计稿
2. 设计稿上的尺寸单位为 px，开发时需转换为 rem，计算规则为：设计稿尺寸 1px / 100 = 0.01 rem
3. 适配英语版本时，需注意文字长度，避免文字溢出
4. 多语言适配，在外层 className 中添加`languageCode` 变量类名，获取 languageCode 通过

   ```
   const { languageCode } = useAtomValue(baseConfig);

   ```
