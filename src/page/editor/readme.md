# 添加编辑器组件

1.  在`src/pages/editor/packages/heroEEComponents`目录下添加组组件文件夹，文件夹名字为组件名字，文件夹内必须包含`index.tsx`、`setter.tsx`文件
    === 注意所有文件需要使用`export default`导出 ===
    - `index.tsx`：组件的展示组件 (renderer)
    - `setter.tsx`：组件的配置组件 (setter)
    - `defaultSetter.ts`: 组件的默认配置, 用于初始化组件配置
2.  在`src/pages/editor/packages/heroEEComponents/index.ts`文件中添加组件的引入 （todo：使用 node 脚本 直接获取`src/pages/editor/packages/heroEEComponents`目录下组件列表）

## 注意合并对象时使用深拷贝

在你的代码中出现 `defaultSetter` 的值也被修改的问题，很可能是因为对象在 JavaScript 中是通过引用传递的。当你使用 `merge` 方法时，可能是导致 `defaultSetter` 被修改的原因之一。下面是一些可能导致问题的原因及解决方案：

### 问题原因

1.  **对象通过引用传递**：在 JavaScript 中，当你将一个对象赋值给另一个变量时，它们实际上是指向同一个内存地址。这意味着如果你修改其中一个变量，另一个变量也会受到影响。

2.  **浅拷贝**：`merge` 方法会在目标对象上合并源对象的属性，如果不小心修改了目标对象中的某些属性，原始对象也可能会被修改。

### 解决方案

1.  **深拷贝对象**：在合并对象之前对其进行深拷贝，以确保不会修改原始对象。可以使用 `lodash-es` 中的 `cloneDeep` 方法来实现深拷贝。

    ```javascript
    import { merge, cloneDeep } from 'lodash-es';

    const config = merge(cloneDeep(defaultSetter), contentJson);
    ```

2.  **使用不可变数据结构**：考虑使用不可变的数据结构库（如 `immer`）来管理状态变更，以防止意外地修改原始对象。

3.  **直接合并到新对象**：如果不希望修改原始对象，可以直接合并到一个空对象中。

    ```javascript
    const config = merge({}, defaultSetter, contentJson);
    ```

### 示例代码

下面是使用 `cloneDeep` 进行深拷贝的示例代码：

```javascript
import { set } from 'es-toolkit/compat';
import { merge, cloneDeep } from 'lodash-es';

const defaultSetter = {
  /* 默认配置 */
};
const contentJson = {
  /* 内容配置 */
};

const config = merge(cloneDeep(defaultSetter), contentJson);
```

通过在合并对象时使用 `cloneDeep`，你可以确保 `defaultSetter` 不会被意外修改。如果你还有其他疑问或者需要进一步的帮助，请随时告诉我！

## 文案配置中的 i18n

```json
  i18n?: {
    serviceName: string; // 官网默认为服务名称page-manage
    module: string; // 页面labelName_父级labelid(唯一标识) 方便查询module下的所有i18n
    code: string; // 'i18n code 规则为p1_uuid'
  };
```
