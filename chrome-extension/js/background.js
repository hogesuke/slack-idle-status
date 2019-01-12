chrome.tabs.onUpdated.addListener(tabId => chrome.pageAction.show(tabId));

// todo tokenが取得できなかった場合の処理
const token = localStorage.getItem('token');

const postProfile = profile => {
  return fetch('https://slack.com/api/users.profile.set', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ profile })
  });
};

chrome.tabs.onCreated.addListener(() => {
  postProfile({ status_text: 'aaa', status_emoji: ':joy:' });
});

chrome.tabs.onRemoved.addListener(() => {
  postProfile({ status_text: 'bbb', status_emoji: ':cry:' });
})
