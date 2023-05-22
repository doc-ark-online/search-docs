import Pandora, { PandoraSDKInterface } from "metaapp-pandora-sdk";
import { detect } from "detect-browser";
const browser = detect();

Pandora.send(
  "config",
  {
    index_type: "wl",
    selfpackagename: "com.metaverse.creator.api",
    send_interval: 100,
    debug: false,
    env: "prod",
    collectErrors: false,
    enableBridge: false,
    browser_name: browser?.name,
    browser_version: browser?.version,
    os_type: browser?.os,
  },
  {
    baseUrl: "https://push.233leyuan.com",
    appkey: "cDEwMTE2",
    zone: "zh",
  }
);

/** 监听所有的单击事件，筛选需要埋点的事件 */
export function globalClickListener() {
  /**
   * 遍历父元素，直到找到具有 data-pandora 属性的元素，然后返回该值。
   * @param {HTMLElement} el - HTMLElement - 您想要找到其潘多拉元素的元素
   * @returns 元素或其父元素的 data-pandora 属性的值。
   */
  const loopPandora = (el: HTMLElement): string | false => {
    const pandora = el.dataset.pandora;
    if (pandora) {
      return pandora;
    } else {
      const parent = el.parentElement;
      if (parent) {
        return loopPandora(parent);
      } else {
        return false;
      }
    }
  };
  window.addEventListener("click", (ev) => {
    try {
      if (ev.target) {
        const el = ev.target as HTMLElement;
        const str = loopPandora(el);
        if (str) {
          const { key, button, button_item } = JSON.parse(str) as {
            key: string;
            button: string;
            button_item?: string;
          };
          pandora.send(key, { button, button_item });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}

Pandora.send("start");

globalClickListener();

export const pandora = {
  send: (key: string, obj: Record<string, any>) => {
    Pandora.send(key, {
      ...obj,
      url: window.location.href,
    });
  },
};
