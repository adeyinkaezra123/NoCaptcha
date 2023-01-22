import {v4 as uuidv4} from 'uuid';

import storage from 'storage/storage';
import {
  getText,
  getActiveTab,
  getPlatform,
  getRandomInt,
  sleep
} from 'utils/common';
import {targetEnv} from 'utils/config';

async function showNotification({
  message,
  messageId,
  title,
  type = 'info',
  timeout = 0
}) {
  if (!title) {
    title = getText('extensionName');
  }
  if (messageId) {
    message = getText(messageId);
  }
  const notification = await browser.notifications.create(
    `bc-notification-${type}`,
    {
      type: 'basic',
      title,
      message,
      iconUrl: '/src/assets/icons/app/icon-64.png'
    }
  );

  if (timeout) {
    window.setTimeout(() => {
      browser.notifications.clear(notification);
    }, timeout);
  }

  return notification;
}

function getListItems(data, {scope = ''} = {}) {
  const labels = {};
  for (const [group, items] of Object.entries(data)) {
    labels[group] = [];
    items.forEach(function (value) {
      const item = {
        value,
        title: getText(`${scope ? scope + '_' : ''}${value}`)
      };

      labels[group].push(item);
    });
  }
  return labels;
}

async function configApp(app) {
  const platform = await getPlatform();

  document.documentElement.classList.add(platform.targetEnv, platform.os);

  if (app) {
    app.config.globalProperties.$env = platform;
  }
}

async function loadFonts(fonts) {
  await Promise.allSettled(fonts.map(font => document.fonts.load(font)));
}

function processMessageResponse(response, sendResponse) {
  if (targetEnv === 'safari') {
    response.then(function (result) {
      // Safari 15: undefined response will cause sendMessage to never resolve.
      if (result === undefined) {
        result = null;
      }
      sendResponse(result);
    });

    return true;
  } else {
    return response;
  }
}

async function showWikiPage({
  speechService = '',
  action = '',
  activeTab = null,
  setOpenerTab = true
} = {}) {
  const wikiAddresses = {
    googleSpeechApi: '/src/wiki/GoogleSpeechApiWiki.html',
    ibmSpeechApi: '/src/wiki/IbmSpeechApiWiki.html',
    microsoftSpeechApi: '/src/wiki/MicrosoftSpeechApiWiki.html',
    witSpeechApi: '/src/wiki/WitSpeechApiWiki.html'
  };

  if (!activeTab) {
    activeTab = await getActiveTab();
  }
  if (action) {
    url = `${url}?action=${action}`;
  }
  let url = browser.runtime.getURL(wikiAddresses[speechService]);
  const props = {url, index: activeTab.index + 1, active: true};

  if (
    setOpenerTab &&
    activeTab.id !== browser.tabs.TAB_ID_NONE &&
    (await getPlatform()).os !== 'android'
  ) {
    props.openerTabId = activeTab.id;
  }

  return browser.tabs.create(props);
}

function meanSleep(ms) {
  const maxDeviation = 0.1 * ms;
  return sleep(getRandomInt(ms - maxDeviation, ms + maxDeviation));
}

function sendNativeMessage(port, message, {timeout = 10000} = {}) {
  return new Promise((resolve, reject) => {
    const id = uuidv4();
    message.id = id;

    const messageCallback = function (msg) {
      if (msg.id !== id) {
        return;
      }
      removeListeners();
      resolve(msg);
    };
    const errorCallback = function () {
      removeListeners();
      reject('No response from native app');
    };
    const removeListeners = function () {
      window.clearTimeout(timeoutId);
      port.onMessage.removeListener(messageCallback);
      port.onDisconnect.removeListener(errorCallback);
    };

    const timeoutId = window.setTimeout(function () {
      errorCallback();
    }, timeout);

    port.onMessage.addListener(messageCallback);
    port.onDisconnect.addListener(errorCallback);

    port.postMessage(message);
  });
}

export {
  showNotification,
  getListItems,
  configApp,
  loadFonts,
  processMessageResponse,
  showWikiPage,
  meanSleep,
  sendNativeMessage
};
