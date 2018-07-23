/*eslint-disable */
/* jshint ignore:start */
import ecc from 'eosjs-ecc'
import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'
import Co from 'co'
import _ from 'lodash'
let util = {}
util._ = _
const eosArray = ['1', '2', '3', '4', '5', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

Array.prototype.shuffle = function () {
  let m = this.length, i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [this[m], this[i]] = [this[i], this[m]]
  }
  return this;
}
util.randomEosName = function(prefix = 'sic', length = 12) {
  let array = eosArray.shuffle();
  return prefix + array.slice(0, length - prefix.length).join('');
}

/**
 * @param arr//需要去重的数组
 * @return  //返回去重之后的新数组
 * */
util.unique = function (arr) {
  var res = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    var repeat = false;　　　
    for (var j = 0; j < res.length; j++) {
      if (arr[i].account == res[j].account) {　　
        repeat = true;　　　　　
        break; 　　　　　　
      }  　　　　
    }
    if (!repeat) {
      res.push(arr[i]); 　　　　
    } 　　
  }　　
  return res;
};
/**
 * 存储localStorage
 */
util.setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
util.getStore = name => {
  if (name === 'account') {
    let store = localStorage.getItem('account')
    if (!store) {
      store = []
    } else {
      store = JSON.parse(store)
    }
    return store
  } else {
    if (!name) return;
    return window.localStorage.getItem(name);
  }
}

/**
 * 删除localStorage
 */
util.removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
/**
 * get wallets from local storage
 */
util.get_wallets = () => {
  let wallets = localStorage.getItem('sic_wallet')
  if (!wallets) {
    wallets = []
  } else {
    wallets = JSON.parse(wallets)
  }
  return wallets
}

util.IsInArray = function (arr, val) {
  let testStr = ',' + arr.join(',') + ',';
  return testStr.indexOf(',' + val + ',') != -1;
};
/**
 * save wallets into local storage
 * @param wallets
 */
util.set_wallets = (wallets) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem('sic_wallet', JSON.stringify(wallets))
    try {
      set_wallets_db(wallets)
      // set_wallet_native(wallets);
    } catch (ex) {

    } finally {
      resolve()
    }
  })
}
/**
 * 删除钱包本地存储
 * @param wallet
 */
util.del_wallet = (wallet) => {
  return new Promise((resolve, reject) => {
    let wallets = util.get_wallets()
    for (let i = 0; i < wallets.length; i++) {
      if (wallet.account === wallets[i].account) {
        wallets.splice(i, 1)
      }
    }
    let encryptionWallets = util.getStore('account')
    for (let i = 0; i < encryptionWallets.length; i++) {
      if (wallet.account === encryptionWallets[i].account) {
        encryptionWallets.splice(i, 1)
      }
    }
    util.setStore('account', encryptionWallets)
    return util.set_wallets(wallets).then(() => {
      resolve()
    })
  })
}
/**
 * 更新钱包
 * @param {*} wallet
 */
util.update_wallet = (wallet) => {
  return new Promise((resolve, reject) => {
    let wallets = util.get_wallets();
    let updated = 0; // eslint-disable-line
    wallets = wallets.map((w) => {
      if (w.account == wallet.account) {
        updated += 1;
        return wallet;
      }
      return w;
    });
    return util.set_wallets(wallets).then(() => {
      resolve();
    });
  });
};
/**
 * 获得免责声明
 * @returns {boolean}
 */
util.get_disclaimer_accepted = () => {
  let result = localStorage.getItem('sic_wallets_accepted');
  return !!Number(result);
};

/**
 * 设定免责声明
 * @param accepted
 */
util.set_disclaimer_accepted = (accepted) => {
  if (accepted) {
    localStorage.setItem('sic_wallets_accepted', accepted ? 1 : 0);
  } else {
    localStorage.removeItem('sic_wallets_accepted');
  }
};
/***
     * 加密
     * @param
     * data（String） => 需要加密的字符串
     * password (String) => 加密的依据
     */
util.encryption = (data, password) => {
  try {
    return AES.encrypt(data, password).toString()
  } catch (exception) {
    return 'index.import_error'
  }
};
/**
 * 解密
 * @param
 * data（String） => 需要解密的字符串
 * password (String) => 解密的依据
 */
util.decrypt = (data, password) => {
  try {
    return CryptoJS.enc.Utf8.stringify(AES.decrypt(data, password))
  } catch (exception) {
    return 'unlock.error.invalid_password'
  }
  // return CryptoJS.enc.Utf8.stringify(AES.decrypt(data, password))
};
/**
 * 导出私钥
 * @param
 * data（String） => 需要解密的字符串
 * password (String) => 解密的依据
 */
util.decryptActive = (data, password) => {
  return util.decrypt(data, password)
}
/**
 * 导出公钥
 * @param
 * data（String） => 需要解密的字符串
 * password (String) => 解密的依据
 */
util.backupPublicKey = (data, password) => {
  let str = util.decrypt(data, password)
  if (str !== 'unlock.error.invalid_password') {
    let publicKey = ecc.privateToPublic(str)
    return publicKey
  } else {
    return 'unlock.error.invalid_password'
  }
}
/**
 * 备份导出
 * @param
 * data（Object） => 具有加密的对象
 * password (String) => 解密 加密的依据
 */
util.backupExport = (data, password) => {
  let backupData = {
    'account': data.account
  }
  backupData.active = util.decrypt(data.active, password)
  backupData.owner = util.decrypt(data.owner, password)
  let exportStr = JSON.stringify(backupData)
  exportStr = util.encryption(exportStr, password)
  return exportStr
}
/**
 * 备份导入
 * @param
 * data（String） => 密文
 * password (String) => 解密 加密的依据
 */
util.backupImport = (data, password) => {
  let backupData = null
  if (util.decrypt(data, password)) {
    backupData = JSON.parse(util.decrypt(data, password))
    return backupData
  } else {
    return false
  }
}
/**
 * create an account by faucet api and import
 * @param account
 * @param password
 * @returns {bluebird}
 */
util.create_account = (account, password) => {
  Co(function* () {
    let activekey = yield ecc.randomKey()
    let activePubkey = ecc.privateToPublic(activekey)

    let ownerkey = yield ecc.randomKey();
    let ownerPubkey = ecc.privateToPublic(ownerkey)
    let active = AES.encrypt(activekey, password).toString()
    let owner = AES.encrypt(ownerkey, password).toString()
    let data = {
      params: {
        'chainName': 'eos',
        'accountName': account,
        'keys': {
          'active': activePubkey,
          'owner': ownerPubkey
        }
      },
      wallet: {
        account: account,
        active,
        activePubkey,
        owner,
        ownerPubkey,
        backup_date: null
      }
    }
    return data
  }).catch(function (err) {
    console.log(err);
  });
}
util.go = function (url, $router) {
  if (/^javas/.test(url) || !url) return
  const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
  if (useRouter) {
    if (typeof url === 'object' && url.replace === true) {
      $router.replace(url)
    } else {
      url === 'BACK' ? $router.go(-1) : $router.push(url)
    }
  } else {
    window.location.href = url
  }
}
export default util
