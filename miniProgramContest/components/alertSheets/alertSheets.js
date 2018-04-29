import Component from '../Component'

export default {
	/**
	 * 默认参数
	 */
  setDefaults(opts = {}) {
    return {
      buttons: [
        {
          onTap(e) {
            typeof opts.onCancel === `function` && opts.onCancel(e)
          },
        },
        {
          text: opts.confirmText || this.data().confirmText,
          type: opts.confirmType || this.data().confirmType,
          onTap(e) {
            typeof opts.onConfirm === `function` && opts.onConfirm(e)
          },
        },
      ],
    }
  },

  /**
   * 默认数据
   */
  data() {
    return {
      onCancel() { },
      cancelText: `取消`,
      cancelType: `weui-dialog__btn_default`,
      onConfirm() { },
      confirmText: `确定`,
      confirmType: `weui-dialog__btn_primary`,
    }
  },

  showalertSheets(opts = {}) {
    const options = Object.assign({
      visible: !1,
    }, this.setDefaults(), opts);

    // 实例化组件
    const component = new Component({
      scope: `$alertSheets`,
      data: options,
      methods: {
        /**
         * 隐藏
         */
        hide(cb) {
          if (this.removed) return !1;
          this.removed = !0;
          this.setHidden();
          setTimeout(() => typeof cb === `function` && cb(), 300);
        },
        /**
         * 显示
         */
        show() {
          if (this.removed) return !1;
          this.setVisible();
        },

        /**
         * 取消点击事件
         * @param e
         */
        onCancel(e) {
          this.hide(() => typeof options.onCancel === `function` && options.onCancel(e))
        },

        /**
         * 确定点击事件
         * @param e
         */
        onConfirm(e) {
          if (typeof options.onConfirm === `function` && options.onConfirm(e)) {
            return;
          }
          this.hide();
        },

      },
    });

    component.show();

    return component.hide;
  }
}