"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/tough-cookie/dist/pathMatch.js
var require_pathMatch = __commonJS({
  "node_modules/tough-cookie/dist/pathMatch.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pathMatch = pathMatch;
    function pathMatch(reqPath, cookiePath) {
      if (cookiePath === reqPath) {
        return true;
      }
      const idx = reqPath.indexOf(cookiePath);
      if (idx === 0) {
        if (cookiePath[cookiePath.length - 1] === "/") {
          return true;
        }
        if (reqPath.startsWith(cookiePath) && reqPath[cookiePath.length] === "/") {
          return true;
        }
      }
      return false;
    }
  }
});

// node_modules/tldts/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/tldts/dist/cjs/index.js"(exports2) {
    "use strict";
    function shareSameDomainSuffix(hostname, vhost) {
      if (hostname.endsWith(vhost)) {
        return hostname.length === vhost.length || hostname[hostname.length - vhost.length - 1] === ".";
      }
      return false;
    }
    function extractDomainWithSuffix(hostname, publicSuffix) {
      const publicSuffixIndex = hostname.length - publicSuffix.length - 2;
      const lastDotBeforeSuffixIndex = hostname.lastIndexOf(".", publicSuffixIndex);
      if (lastDotBeforeSuffixIndex === -1) {
        return hostname;
      }
      return hostname.slice(lastDotBeforeSuffixIndex + 1);
    }
    function getDomain$1(suffix, hostname, options2) {
      if (options2.validHosts !== null) {
        const validHosts = options2.validHosts;
        for (const vhost of validHosts) {
          if (
            /*@__INLINE__*/
            shareSameDomainSuffix(hostname, vhost)
          ) {
            return vhost;
          }
        }
      }
      let numberOfLeadingDots = 0;
      if (hostname.startsWith(".")) {
        while (numberOfLeadingDots < hostname.length && hostname[numberOfLeadingDots] === ".") {
          numberOfLeadingDots += 1;
        }
      }
      if (suffix.length === hostname.length - numberOfLeadingDots) {
        return null;
      }
      return (
        /*@__INLINE__*/
        extractDomainWithSuffix(hostname, suffix)
      );
    }
    function getDomainWithoutSuffix$1(domain, suffix) {
      return domain.slice(0, -suffix.length - 1);
    }
    function extractHostname(url, urlIsValidHostname) {
      let start = 0;
      let end = url.length;
      let hasUpper = false;
      if (!urlIsValidHostname) {
        if (url.startsWith("data:")) {
          return null;
        }
        while (start < url.length && url.charCodeAt(start) <= 32) {
          start += 1;
        }
        while (end > start + 1 && url.charCodeAt(end - 1) <= 32) {
          end -= 1;
        }
        if (url.charCodeAt(start) === 47 && url.charCodeAt(start + 1) === 47) {
          start += 2;
        } else {
          const indexOfProtocol = url.indexOf(":/", start);
          if (indexOfProtocol !== -1) {
            const protocolSize = indexOfProtocol - start;
            const c0 = url.charCodeAt(start);
            const c1 = url.charCodeAt(start + 1);
            const c2 = url.charCodeAt(start + 2);
            const c3 = url.charCodeAt(start + 3);
            const c4 = url.charCodeAt(start + 4);
            if (protocolSize === 5 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112 && c4 === 115) ;
            else if (protocolSize === 4 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112) ;
            else if (protocolSize === 3 && c0 === 119 && c1 === 115 && c2 === 115) ;
            else if (protocolSize === 2 && c0 === 119 && c1 === 115) ;
            else {
              for (let i = start; i < indexOfProtocol; i += 1) {
                const lowerCaseCode = url.charCodeAt(i) | 32;
                if (!(lowerCaseCode >= 97 && lowerCaseCode <= 122 || // [a, z]
                lowerCaseCode >= 48 && lowerCaseCode <= 57 || // [0, 9]
                lowerCaseCode === 46 || // '.'
                lowerCaseCode === 45 || // '-'
                lowerCaseCode === 43)) {
                  return null;
                }
              }
            }
            start = indexOfProtocol + 2;
            while (url.charCodeAt(start) === 47) {
              start += 1;
            }
          }
        }
        let indexOfIdentifier = -1;
        let indexOfClosingBracket = -1;
        let indexOfPort = -1;
        for (let i = start; i < end; i += 1) {
          const code = url.charCodeAt(i);
          if (code === 35 || // '#'
          code === 47 || // '/'
          code === 63) {
            end = i;
            break;
          } else if (code === 64) {
            indexOfIdentifier = i;
          } else if (code === 93) {
            indexOfClosingBracket = i;
          } else if (code === 58) {
            indexOfPort = i;
          } else if (code >= 65 && code <= 90) {
            hasUpper = true;
          }
        }
        if (indexOfIdentifier !== -1 && indexOfIdentifier > start && indexOfIdentifier < end) {
          start = indexOfIdentifier + 1;
        }
        if (url.charCodeAt(start) === 91) {
          if (indexOfClosingBracket !== -1) {
            return url.slice(start + 1, indexOfClosingBracket).toLowerCase();
          }
          return null;
        } else if (indexOfPort !== -1 && indexOfPort > start && indexOfPort < end) {
          end = indexOfPort;
        }
      }
      while (end > start + 1 && url.charCodeAt(end - 1) === 46) {
        end -= 1;
      }
      const hostname = start !== 0 || end !== url.length ? url.slice(start, end) : url;
      if (hasUpper) {
        return hostname.toLowerCase();
      }
      return hostname;
    }
    function isProbablyIpv4(hostname) {
      if (hostname.length < 7) {
        return false;
      }
      if (hostname.length > 15) {
        return false;
      }
      let numberOfDots = 0;
      for (let i = 0; i < hostname.length; i += 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46) {
          numberOfDots += 1;
        } else if (code < 48 || code > 57) {
          return false;
        }
      }
      return numberOfDots === 3 && hostname.charCodeAt(0) !== 46 && hostname.charCodeAt(hostname.length - 1) !== 46;
    }
    function isProbablyIpv6(hostname) {
      if (hostname.length < 3) {
        return false;
      }
      let start = hostname.startsWith("[") ? 1 : 0;
      let end = hostname.length;
      if (hostname[end - 1] === "]") {
        end -= 1;
      }
      if (end - start > 39) {
        return false;
      }
      let hasColon = false;
      for (; start < end; start += 1) {
        const code = hostname.charCodeAt(start);
        if (code === 58) {
          hasColon = true;
        } else if (!(code >= 48 && code <= 57 || // 0-9
        code >= 97 && code <= 102 || // a-f
        code >= 65 && code <= 90)) {
          return false;
        }
      }
      return hasColon;
    }
    function isIp(hostname) {
      return isProbablyIpv6(hostname) || isProbablyIpv4(hostname);
    }
    function isValidAscii(code) {
      return code >= 97 && code <= 122 || code >= 48 && code <= 57 || code > 127;
    }
    function isValidHostname(hostname) {
      if (hostname.length > 255) {
        return false;
      }
      if (hostname.length === 0) {
        return false;
      }
      if (
        /*@__INLINE__*/
        !isValidAscii(hostname.charCodeAt(0)) && hostname.charCodeAt(0) !== 46 && // '.' (dot)
        hostname.charCodeAt(0) !== 95
      ) {
        return false;
      }
      let lastDotIndex = -1;
      let lastCharCode = -1;
      const len = hostname.length;
      for (let i = 0; i < len; i += 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46) {
          if (
            // Check that previous label is < 63 bytes long (64 = 63 + '.')
            i - lastDotIndex > 64 || // Check that previous character was not already a '.'
            lastCharCode === 46 || // Check that the previous label does not end with a '-' (dash)
            lastCharCode === 45 || // Check that the previous label does not end with a '_' (underscore)
            lastCharCode === 95
          ) {
            return false;
          }
          lastDotIndex = i;
        } else if (!/*@__INLINE__*/
        (isValidAscii(code) || code === 45 || code === 95)) {
          return false;
        }
        lastCharCode = code;
      }
      return (
        // Check that last label is shorter than 63 chars
        len - lastDotIndex - 1 <= 63 && // Check that the last character is an allowed trailing label character.
        // Since we already checked that the char is a valid hostname character,
        // we only need to check that it's different from '-'.
        lastCharCode !== 45
      );
    }
    function setDefaultsImpl({ allowIcannDomains = true, allowPrivateDomains = false, detectIp = true, extractHostname: extractHostname2 = true, mixedInputs = true, validHosts = null, validateHostname = true }) {
      return {
        allowIcannDomains,
        allowPrivateDomains,
        detectIp,
        extractHostname: extractHostname2,
        mixedInputs,
        validHosts,
        validateHostname
      };
    }
    var DEFAULT_OPTIONS = (
      /*@__INLINE__*/
      setDefaultsImpl({})
    );
    function setDefaults(options2) {
      if (options2 === void 0) {
        return DEFAULT_OPTIONS;
      }
      return (
        /*@__INLINE__*/
        setDefaultsImpl(options2)
      );
    }
    function getSubdomain$1(hostname, domain) {
      if (domain.length === hostname.length) {
        return "";
      }
      return hostname.slice(0, -domain.length - 1);
    }
    function getEmptyResult() {
      return {
        domain: null,
        domainWithoutSuffix: null,
        hostname: null,
        isIcann: null,
        isIp: null,
        isPrivate: null,
        publicSuffix: null,
        subdomain: null
      };
    }
    function resetResult(result) {
      result.domain = null;
      result.domainWithoutSuffix = null;
      result.hostname = null;
      result.isIcann = null;
      result.isIp = null;
      result.isPrivate = null;
      result.publicSuffix = null;
      result.subdomain = null;
    }
    function parseImpl(url, step, suffixLookup2, partialOptions, result) {
      const options2 = (
        /*@__INLINE__*/
        setDefaults(partialOptions)
      );
      if (typeof url !== "string") {
        return result;
      }
      if (!options2.extractHostname) {
        result.hostname = url;
      } else if (options2.mixedInputs) {
        result.hostname = extractHostname(url, isValidHostname(url));
      } else {
        result.hostname = extractHostname(url, false);
      }
      if (step === 0 || result.hostname === null) {
        return result;
      }
      if (options2.detectIp) {
        result.isIp = isIp(result.hostname);
        if (result.isIp) {
          return result;
        }
      }
      if (options2.validateHostname && options2.extractHostname && !isValidHostname(result.hostname)) {
        result.hostname = null;
        return result;
      }
      suffixLookup2(result.hostname, options2, result);
      if (step === 2 || result.publicSuffix === null) {
        return result;
      }
      result.domain = getDomain$1(result.publicSuffix, result.hostname, options2);
      if (step === 3 || result.domain === null) {
        return result;
      }
      result.subdomain = getSubdomain$1(result.hostname, result.domain);
      if (step === 4) {
        return result;
      }
      result.domainWithoutSuffix = getDomainWithoutSuffix$1(result.domain, result.publicSuffix);
      return result;
    }
    function fastPathLookup(hostname, options2, out) {
      if (!options2.allowPrivateDomains && hostname.length > 3) {
        const last = hostname.length - 1;
        const c3 = hostname.charCodeAt(last);
        const c2 = hostname.charCodeAt(last - 1);
        const c1 = hostname.charCodeAt(last - 2);
        const c0 = hostname.charCodeAt(last - 3);
        if (c3 === 109 && c2 === 111 && c1 === 99 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "com";
          return true;
        } else if (c3 === 103 && c2 === 114 && c1 === 111 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "org";
          return true;
        } else if (c3 === 117 && c2 === 100 && c1 === 101 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "edu";
          return true;
        } else if (c3 === 118 && c2 === 111 && c1 === 103 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "gov";
          return true;
        } else if (c3 === 116 && c2 === 101 && c1 === 110 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "net";
          return true;
        } else if (c3 === 101 && c2 === 100 && c1 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "de";
          return true;
        }
      }
      return false;
    }
    var exceptions = /* @__PURE__ */ (function() {
      const _0 = [1, {}], _1 = [2, {}], _2 = [0, { "city": _0 }];
      const exceptions2 = [0, { "ck": [0, { "www": _0 }], "jp": [0, { "kawasaki": _2, "kitakyushu": _2, "kobe": _2, "nagoya": _2, "sapporo": _2, "sendai": _2, "yokohama": _2 }], "dev": [0, { "hrsn": [0, { "psl": [0, { "wc": [0, { "ignored": _1, "sub": [0, { "ignored": _1 }] }] }] }] }] }];
      return exceptions2;
    })();
    var rules = /* @__PURE__ */ (function() {
      const _3 = [1, {}], _4 = [2, {}], _5 = [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], _6 = [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], _7 = [0, { "*": _4 }], _8 = [2, { "s": _7 }], _9 = [0, { "relay": _4 }], _10 = [2, { "id": _4 }], _11 = [1, { "gov": _3 }], _12 = [0, { "transfer-webapp": _4 }], _13 = [0, { "notebook": _4, "studio": _4 }], _14 = [0, { "labeling": _4, "notebook": _4, "studio": _4 }], _15 = [0, { "notebook": _4 }], _16 = [0, { "labeling": _4, "notebook": _4, "notebook-fips": _4, "studio": _4 }], _17 = [0, { "notebook": _4, "notebook-fips": _4, "studio": _4, "studio-fips": _4 }], _18 = [0, { "*": _3 }], _19 = [1, { "co": _4 }], _20 = [0, { "objects": _4 }], _21 = [2, { "nodes": _4 }], _22 = [0, { "my": _7 }], _23 = [0, { "s3": _4, "s3-accesspoint": _4, "s3-website": _4 }], _24 = [0, { "s3": _4, "s3-accesspoint": _4 }], _25 = [0, { "direct": _4 }], _26 = [0, { "webview-assets": _4 }], _27 = [0, { "vfs": _4, "webview-assets": _4 }], _28 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": _27 }], _29 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _24, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": _27 }], _30 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], _31 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4 }], _32 = [0, { "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-website": _4 }], _33 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": _27 }], _34 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-deprecated": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], _35 = [0, { "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4 }], _36 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _35, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4 }], _37 = [0, { "auth": _4 }], _38 = [0, { "auth": _4, "auth-fips": _4 }], _39 = [0, { "auth-fips": _4 }], _40 = [0, { "apps": _4 }], _41 = [0, { "paas": _4 }], _42 = [2, { "eu": _4 }], _43 = [0, { "app": _4 }], _44 = [0, { "site": _4 }], _45 = [1, { "com": _3, "edu": _3, "net": _3, "org": _3 }], _46 = [0, { "j": _4 }], _47 = [0, { "dyn": _4 }], _48 = [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], _49 = [0, { "p": _4 }], _50 = [0, { "user": _4 }], _51 = [0, { "shop": _4 }], _52 = [0, { "cdn": _4 }], _53 = [0, { "cust": _4, "reservd": _4 }], _54 = [0, { "cust": _4 }], _55 = [0, { "s3": _4 }], _56 = [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "net": _3, "org": _3 }], _57 = [0, { "ipfs": _4 }], _58 = [1, { "framer": _4 }], _59 = [0, { "forgot": _4 }], _60 = [1, { "gs": _3 }], _61 = [0, { "nes": _3 }], _62 = [1, { "k12": _3, "cc": _3, "lib": _3 }], _63 = [1, { "cc": _3, "lib": _3 }];
      const rules2 = [0, { "ac": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "drr": _4, "feedback": _4, "forms": _4 }], "ad": _3, "ae": [1, { "ac": _3, "co": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "sch": _3 }], "aero": [1, { "airline": _3, "airport": _3, "accident-investigation": _3, "accident-prevention": _3, "aerobatic": _3, "aeroclub": _3, "aerodrome": _3, "agents": _3, "air-surveillance": _3, "air-traffic-control": _3, "aircraft": _3, "airtraffic": _3, "ambulance": _3, "association": _3, "author": _3, "ballooning": _3, "broker": _3, "caa": _3, "cargo": _3, "catering": _3, "certification": _3, "championship": _3, "charter": _3, "civilaviation": _3, "club": _3, "conference": _3, "consultant": _3, "consulting": _3, "control": _3, "council": _3, "crew": _3, "design": _3, "dgca": _3, "educator": _3, "emergency": _3, "engine": _3, "engineer": _3, "entertainment": _3, "equipment": _3, "exchange": _3, "express": _3, "federation": _3, "flight": _3, "freight": _3, "fuel": _3, "gliding": _3, "government": _3, "groundhandling": _3, "group": _3, "hanggliding": _3, "homebuilt": _3, "insurance": _3, "journal": _3, "journalist": _3, "leasing": _3, "logistics": _3, "magazine": _3, "maintenance": _3, "marketplace": _3, "media": _3, "microlight": _3, "modelling": _3, "navigation": _3, "parachuting": _3, "paragliding": _3, "passenger-association": _3, "pilot": _3, "press": _3, "production": _3, "recreation": _3, "repbody": _3, "res": _3, "research": _3, "rotorcraft": _3, "safety": _3, "scientist": _3, "services": _3, "show": _3, "skydiving": _3, "software": _3, "student": _3, "taxi": _3, "trader": _3, "trading": _3, "trainer": _3, "union": _3, "workinggroup": _3, "works": _3 }], "af": _5, "ag": [1, { "co": _3, "com": _3, "net": _3, "nom": _3, "org": _3, "obj": _4 }], "ai": [1, { "com": _3, "net": _3, "off": _3, "org": _3, "uwu": _4, "framer": _4 }], "al": _6, "am": [1, { "co": _3, "com": _3, "commune": _3, "net": _3, "org": _3, "radio": _4 }], "ao": [1, { "co": _3, "ed": _3, "edu": _3, "gov": _3, "gv": _3, "it": _3, "og": _3, "org": _3, "pb": _3 }], "aq": _3, "ar": [1, { "bet": _3, "com": _3, "coop": _3, "edu": _3, "gob": _3, "gov": _3, "int": _3, "mil": _3, "musica": _3, "mutual": _3, "net": _3, "org": _3, "seg": _3, "senasa": _3, "tur": _3 }], "arpa": [1, { "e164": _3, "home": _3, "in-addr": _3, "ip6": _3, "iris": _3, "uri": _3, "urn": _3 }], "as": _11, "asia": [1, { "cloudns": _4, "daemon": _4, "dix": _4 }], "at": [1, { "ac": [1, { "sth": _3 }], "co": _3, "gv": _3, "or": _3, "funkfeuer": [0, { "wien": _4 }], "futurecms": [0, { "*": _4, "ex": _7, "in": _7 }], "futurehosting": _4, "futuremailing": _4, "ortsinfo": [0, { "ex": _7, "kunden": _7 }], "biz": _4, "info": _4, "123webseite": _4, "priv": _4, "myspreadshop": _4, "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4 }], "au": [1, { "asn": _3, "com": [1, { "cloudlets": [0, { "mel": _4 }], "myspreadshop": _4 }], "edu": [1, { "act": _3, "catholic": _3, "nsw": [1, { "schools": _3 }], "nt": _3, "qld": _3, "sa": _3, "tas": _3, "vic": _3, "wa": _3 }], "gov": [1, { "qld": _3, "sa": _3, "tas": _3, "vic": _3, "wa": _3 }], "id": _3, "net": _3, "org": _3, "conf": _3, "oz": _3, "act": _3, "nsw": _3, "nt": _3, "qld": _3, "sa": _3, "tas": _3, "vic": _3, "wa": _3 }], "aw": [1, { "com": _3 }], "ax": _3, "az": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "int": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pp": _3, "pro": _3 }], "ba": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "rs": _4 }], "bb": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "net": _3, "org": _3, "store": _3, "tv": _3 }], "bd": _18, "be": [1, { "ac": _3, "cloudns": _4, "webhosting": _4, "interhostsolutions": [0, { "cloud": _4 }], "kuleuven": [0, { "ezproxy": _4 }], "123website": _4, "myspreadshop": _4, "transurl": _7 }], "bf": _11, "bg": [1, { "0": _3, "1": _3, "2": _3, "3": _3, "4": _3, "5": _3, "6": _3, "7": _3, "8": _3, "9": _3, "a": _3, "b": _3, "c": _3, "d": _3, "e": _3, "f": _3, "g": _3, "h": _3, "i": _3, "j": _3, "k": _3, "l": _3, "m": _3, "n": _3, "o": _3, "p": _3, "q": _3, "r": _3, "s": _3, "t": _3, "u": _3, "v": _3, "w": _3, "x": _3, "y": _3, "z": _3, "barsy": _4 }], "bh": _5, "bi": [1, { "co": _3, "com": _3, "edu": _3, "or": _3, "org": _3 }], "biz": [1, { "activetrail": _4, "cloud-ip": _4, "cloudns": _4, "jozi": _4, "dyndns": _4, "for-better": _4, "for-more": _4, "for-some": _4, "for-the": _4, "selfip": _4, "webhop": _4, "orx": _4, "mmafan": _4, "myftp": _4, "no-ip": _4, "dscloud": _4 }], "bj": [1, { "africa": _3, "agro": _3, "architectes": _3, "assur": _3, "avocats": _3, "co": _3, "com": _3, "eco": _3, "econo": _3, "edu": _3, "info": _3, "loisirs": _3, "money": _3, "net": _3, "org": _3, "ote": _3, "restaurant": _3, "resto": _3, "tourism": _3, "univ": _3 }], "bm": _5, "bn": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "co": _4 }], "bo": [1, { "com": _3, "edu": _3, "gob": _3, "int": _3, "mil": _3, "net": _3, "org": _3, "tv": _3, "web": _3, "academia": _3, "agro": _3, "arte": _3, "blog": _3, "bolivia": _3, "ciencia": _3, "cooperativa": _3, "democracia": _3, "deporte": _3, "ecologia": _3, "economia": _3, "empresa": _3, "indigena": _3, "industria": _3, "info": _3, "medicina": _3, "movimiento": _3, "musica": _3, "natural": _3, "nombre": _3, "noticias": _3, "patria": _3, "plurinacional": _3, "politica": _3, "profesional": _3, "pueblo": _3, "revista": _3, "salud": _3, "tecnologia": _3, "tksat": _3, "transporte": _3, "wiki": _3 }], "br": [1, { "9guacu": _3, "abc": _3, "adm": _3, "adv": _3, "agr": _3, "aju": _3, "am": _3, "anani": _3, "aparecida": _3, "app": _3, "arq": _3, "art": _3, "ato": _3, "b": _3, "barueri": _3, "belem": _3, "bet": _3, "bhz": _3, "bib": _3, "bio": _3, "blog": _3, "bmd": _3, "boavista": _3, "bsb": _3, "campinagrande": _3, "campinas": _3, "caxias": _3, "cim": _3, "cng": _3, "cnt": _3, "com": [1, { "simplesite": _4 }], "contagem": _3, "coop": _3, "coz": _3, "cri": _3, "cuiaba": _3, "curitiba": _3, "def": _3, "des": _3, "det": _3, "dev": _3, "ecn": _3, "eco": _3, "edu": _3, "emp": _3, "enf": _3, "eng": _3, "esp": _3, "etc": _3, "eti": _3, "far": _3, "feira": _3, "flog": _3, "floripa": _3, "fm": _3, "fnd": _3, "fortal": _3, "fot": _3, "foz": _3, "fst": _3, "g12": _3, "geo": _3, "ggf": _3, "goiania": _3, "gov": [1, { "ac": _3, "al": _3, "am": _3, "ap": _3, "ba": _3, "ce": _3, "df": _3, "es": _3, "go": _3, "ma": _3, "mg": _3, "ms": _3, "mt": _3, "pa": _3, "pb": _3, "pe": _3, "pi": _3, "pr": _3, "rj": _3, "rn": _3, "ro": _3, "rr": _3, "rs": _3, "sc": _3, "se": _3, "sp": _3, "to": _3 }], "gru": _3, "imb": _3, "ind": _3, "inf": _3, "jab": _3, "jampa": _3, "jdf": _3, "joinville": _3, "jor": _3, "jus": _3, "leg": [1, { "ac": _4, "al": _4, "am": _4, "ap": _4, "ba": _4, "ce": _4, "df": _4, "es": _4, "go": _4, "ma": _4, "mg": _4, "ms": _4, "mt": _4, "pa": _4, "pb": _4, "pe": _4, "pi": _4, "pr": _4, "rj": _4, "rn": _4, "ro": _4, "rr": _4, "rs": _4, "sc": _4, "se": _4, "sp": _4, "to": _4 }], "leilao": _3, "lel": _3, "log": _3, "londrina": _3, "macapa": _3, "maceio": _3, "manaus": _3, "maringa": _3, "mat": _3, "med": _3, "mil": _3, "morena": _3, "mp": _3, "mus": _3, "natal": _3, "net": _3, "niteroi": _3, "nom": _18, "not": _3, "ntr": _3, "odo": _3, "ong": _3, "org": _3, "osasco": _3, "palmas": _3, "poa": _3, "ppg": _3, "pro": _3, "psc": _3, "psi": _3, "pvh": _3, "qsl": _3, "radio": _3, "rec": _3, "recife": _3, "rep": _3, "ribeirao": _3, "rio": _3, "riobranco": _3, "riopreto": _3, "salvador": _3, "sampa": _3, "santamaria": _3, "santoandre": _3, "saobernardo": _3, "saogonca": _3, "seg": _3, "sjc": _3, "slg": _3, "slz": _3, "sorocaba": _3, "srv": _3, "taxi": _3, "tc": _3, "tec": _3, "teo": _3, "the": _3, "tmp": _3, "trd": _3, "tur": _3, "tv": _3, "udi": _3, "vet": _3, "vix": _3, "vlog": _3, "wiki": _3, "zlg": _3 }], "bs": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "we": _4 }], "bt": _5, "bv": _3, "bw": [1, { "ac": _3, "co": _3, "gov": _3, "net": _3, "org": _3 }], "by": [1, { "gov": _3, "mil": _3, "com": _3, "of": _3, "mediatech": _4 }], "bz": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "za": _4, "mydns": _4, "gsj": _4 }], "ca": [1, { "ab": _3, "bc": _3, "mb": _3, "nb": _3, "nf": _3, "nl": _3, "ns": _3, "nt": _3, "nu": _3, "on": _3, "pe": _3, "qc": _3, "sk": _3, "yk": _3, "gc": _3, "barsy": _4, "awdev": _7, "co": _4, "no-ip": _4, "myspreadshop": _4, "box": _4 }], "cat": _3, "cc": [1, { "cleverapps": _4, "cloudns": _4, "ftpaccess": _4, "game-server": _4, "myphotos": _4, "scrapping": _4, "twmail": _4, "csx": _4, "fantasyleague": _4, "spawn": [0, { "instances": _4 }] }], "cd": _11, "cf": _3, "cg": _3, "ch": [1, { "square7": _4, "cloudns": _4, "cloudscale": [0, { "cust": _4, "lpg": _20, "rma": _20 }], "flow": [0, { "ae": [0, { "alp1": _4 }], "appengine": _4 }], "linkyard-cloud": _4, "gotdns": _4, "dnsking": _4, "123website": _4, "myspreadshop": _4, "firenet": [0, { "*": _4, "svc": _7 }], "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4 }], "ci": [1, { "ac": _3, "xn--aroport-bya": _3, "a\xE9roport": _3, "asso": _3, "co": _3, "com": _3, "ed": _3, "edu": _3, "go": _3, "gouv": _3, "int": _3, "net": _3, "or": _3, "org": _3 }], "ck": _18, "cl": [1, { "co": _3, "gob": _3, "gov": _3, "mil": _3, "cloudns": _4 }], "cm": [1, { "co": _3, "com": _3, "gov": _3, "net": _3 }], "cn": [1, { "ac": _3, "com": [1, { "amazonaws": [0, { "cn-north-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-deprecated": _4, "s3-object-lambda": _4, "s3-website": _4 }], "cn-northwest-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _24, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4 }], "compute": _7, "airflow": [0, { "cn-north-1": _7, "cn-northwest-1": _7 }], "eb": [0, { "cn-north-1": _4, "cn-northwest-1": _4 }], "elb": _7 }], "sagemaker": [0, { "cn-north-1": _13, "cn-northwest-1": _13 }] }], "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "xn--55qx5d": _3, "\u516C\u53F8": _3, "xn--od0alg": _3, "\u7DB2\u7D61": _3, "xn--io0a7i": _3, "\u7F51\u7EDC": _3, "ah": _3, "bj": _3, "cq": _3, "fj": _3, "gd": _3, "gs": _3, "gx": _3, "gz": _3, "ha": _3, "hb": _3, "he": _3, "hi": _3, "hk": _3, "hl": _3, "hn": _3, "jl": _3, "js": _3, "jx": _3, "ln": _3, "mo": _3, "nm": _3, "nx": _3, "qh": _3, "sc": _3, "sd": _3, "sh": [1, { "as": _4 }], "sn": _3, "sx": _3, "tj": _3, "tw": _3, "xj": _3, "xz": _3, "yn": _3, "zj": _3, "canva-apps": _4, "canvasite": _22, "myqnapcloud": _4, "quickconnect": _25 }], "co": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "carrd": _4, "crd": _4, "otap": _7, "leadpages": _4, "lpages": _4, "mypi": _4, "xmit": _7, "firewalledreplit": _10, "repl": _10, "supabase": _4 }], "com": [1, { "a2hosted": _4, "cpserver": _4, "adobeaemcloud": [2, { "dev": _7 }], "africa": _4, "airkitapps": _4, "airkitapps-au": _4, "aivencloud": _4, "alibabacloudcs": _4, "kasserver": _4, "amazonaws": [0, { "af-south-1": _28, "ap-east-1": _29, "ap-northeast-1": _30, "ap-northeast-2": _30, "ap-northeast-3": _28, "ap-south-1": _30, "ap-south-2": _31, "ap-southeast-1": _30, "ap-southeast-2": _30, "ap-southeast-3": _31, "ap-southeast-4": _31, "ap-southeast-5": [0, { "execute-api": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-deprecated": _4, "s3-object-lambda": _4, "s3-website": _4 }], "ca-central-1": _33, "ca-west-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4 }], "eu-central-1": _30, "eu-central-2": _31, "eu-north-1": _29, "eu-south-1": _28, "eu-south-2": _31, "eu-west-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-deprecated": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], "eu-west-2": _29, "eu-west-3": _28, "il-central-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": [0, { "vfs": _4 }] }], "me-central-1": _31, "me-south-1": _29, "sa-east-1": _28, "us-east-1": [2, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-deprecated": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], "us-east-2": _34, "us-gov-east-1": _36, "us-gov-west-1": _36, "us-west-1": _33, "us-west-2": _34, "compute": _7, "compute-1": _7, "airflow": [0, { "af-south-1": _7, "ap-east-1": _7, "ap-northeast-1": _7, "ap-northeast-2": _7, "ap-northeast-3": _7, "ap-south-1": _7, "ap-south-2": _7, "ap-southeast-1": _7, "ap-southeast-2": _7, "ap-southeast-3": _7, "ap-southeast-4": _7, "ca-central-1": _7, "ca-west-1": _7, "eu-central-1": _7, "eu-central-2": _7, "eu-north-1": _7, "eu-south-1": _7, "eu-south-2": _7, "eu-west-1": _7, "eu-west-2": _7, "eu-west-3": _7, "il-central-1": _7, "me-central-1": _7, "me-south-1": _7, "sa-east-1": _7, "us-east-1": _7, "us-east-2": _7, "us-west-1": _7, "us-west-2": _7 }], "s3": _4, "s3-1": _4, "s3-ap-east-1": _4, "s3-ap-northeast-1": _4, "s3-ap-northeast-2": _4, "s3-ap-northeast-3": _4, "s3-ap-south-1": _4, "s3-ap-southeast-1": _4, "s3-ap-southeast-2": _4, "s3-ca-central-1": _4, "s3-eu-central-1": _4, "s3-eu-north-1": _4, "s3-eu-west-1": _4, "s3-eu-west-2": _4, "s3-eu-west-3": _4, "s3-external-1": _4, "s3-fips-us-gov-east-1": _4, "s3-fips-us-gov-west-1": _4, "s3-global": [0, { "accesspoint": [0, { "mrap": _4 }] }], "s3-me-south-1": _4, "s3-sa-east-1": _4, "s3-us-east-2": _4, "s3-us-gov-east-1": _4, "s3-us-gov-west-1": _4, "s3-us-west-1": _4, "s3-us-west-2": _4, "s3-website-ap-northeast-1": _4, "s3-website-ap-southeast-1": _4, "s3-website-ap-southeast-2": _4, "s3-website-eu-west-1": _4, "s3-website-sa-east-1": _4, "s3-website-us-east-1": _4, "s3-website-us-gov-west-1": _4, "s3-website-us-west-1": _4, "s3-website-us-west-2": _4, "elb": _7 }], "amazoncognito": [0, { "af-south-1": _37, "ap-east-1": _37, "ap-northeast-1": _37, "ap-northeast-2": _37, "ap-northeast-3": _37, "ap-south-1": _37, "ap-south-2": _37, "ap-southeast-1": _37, "ap-southeast-2": _37, "ap-southeast-3": _37, "ap-southeast-4": _37, "ap-southeast-5": _37, "ca-central-1": _37, "ca-west-1": _37, "eu-central-1": _37, "eu-central-2": _37, "eu-north-1": _37, "eu-south-1": _37, "eu-south-2": _37, "eu-west-1": _37, "eu-west-2": _37, "eu-west-3": _37, "il-central-1": _37, "me-central-1": _37, "me-south-1": _37, "sa-east-1": _37, "us-east-1": _38, "us-east-2": _38, "us-gov-east-1": _39, "us-gov-west-1": _39, "us-west-1": _38, "us-west-2": _38 }], "amplifyapp": _4, "awsapprunner": _7, "awsapps": _4, "elasticbeanstalk": [2, { "af-south-1": _4, "ap-east-1": _4, "ap-northeast-1": _4, "ap-northeast-2": _4, "ap-northeast-3": _4, "ap-south-1": _4, "ap-southeast-1": _4, "ap-southeast-2": _4, "ap-southeast-3": _4, "ca-central-1": _4, "eu-central-1": _4, "eu-north-1": _4, "eu-south-1": _4, "eu-west-1": _4, "eu-west-2": _4, "eu-west-3": _4, "il-central-1": _4, "me-south-1": _4, "sa-east-1": _4, "us-east-1": _4, "us-east-2": _4, "us-gov-east-1": _4, "us-gov-west-1": _4, "us-west-1": _4, "us-west-2": _4 }], "awsglobalaccelerator": _4, "siiites": _4, "appspacehosted": _4, "appspaceusercontent": _4, "on-aptible": _4, "myasustor": _4, "balena-devices": _4, "boutir": _4, "bplaced": _4, "cafjs": _4, "canva-apps": _4, "cdn77-storage": _4, "br": _4, "cn": _4, "de": _4, "eu": _4, "jpn": _4, "mex": _4, "ru": _4, "sa": _4, "uk": _4, "us": _4, "za": _4, "clever-cloud": [0, { "services": _7 }], "dnsabr": _4, "ip-ddns": _4, "jdevcloud": _4, "wpdevcloud": _4, "cf-ipfs": _4, "cloudflare-ipfs": _4, "trycloudflare": _4, "co": _4, "devinapps": _7, "builtwithdark": _4, "datadetect": [0, { "demo": _4, "instance": _4 }], "dattolocal": _4, "dattorelay": _4, "dattoweb": _4, "mydatto": _4, "digitaloceanspaces": _7, "discordsays": _4, "discordsez": _4, "drayddns": _4, "dreamhosters": _4, "durumis": _4, "mydrobo": _4, "blogdns": _4, "cechire": _4, "dnsalias": _4, "dnsdojo": _4, "doesntexist": _4, "dontexist": _4, "doomdns": _4, "dyn-o-saur": _4, "dynalias": _4, "dyndns-at-home": _4, "dyndns-at-work": _4, "dyndns-blog": _4, "dyndns-free": _4, "dyndns-home": _4, "dyndns-ip": _4, "dyndns-mail": _4, "dyndns-office": _4, "dyndns-pics": _4, "dyndns-remote": _4, "dyndns-server": _4, "dyndns-web": _4, "dyndns-wiki": _4, "dyndns-work": _4, "est-a-la-maison": _4, "est-a-la-masion": _4, "est-le-patron": _4, "est-mon-blogueur": _4, "from-ak": _4, "from-al": _4, "from-ar": _4, "from-ca": _4, "from-ct": _4, "from-dc": _4, "from-de": _4, "from-fl": _4, "from-ga": _4, "from-hi": _4, "from-ia": _4, "from-id": _4, "from-il": _4, "from-in": _4, "from-ks": _4, "from-ky": _4, "from-ma": _4, "from-md": _4, "from-mi": _4, "from-mn": _4, "from-mo": _4, "from-ms": _4, "from-mt": _4, "from-nc": _4, "from-nd": _4, "from-ne": _4, "from-nh": _4, "from-nj": _4, "from-nm": _4, "from-nv": _4, "from-oh": _4, "from-ok": _4, "from-or": _4, "from-pa": _4, "from-pr": _4, "from-ri": _4, "from-sc": _4, "from-sd": _4, "from-tn": _4, "from-tx": _4, "from-ut": _4, "from-va": _4, "from-vt": _4, "from-wa": _4, "from-wi": _4, "from-wv": _4, "from-wy": _4, "getmyip": _4, "gotdns": _4, "hobby-site": _4, "homelinux": _4, "homeunix": _4, "iamallama": _4, "is-a-anarchist": _4, "is-a-blogger": _4, "is-a-bookkeeper": _4, "is-a-bulls-fan": _4, "is-a-caterer": _4, "is-a-chef": _4, "is-a-conservative": _4, "is-a-cpa": _4, "is-a-cubicle-slave": _4, "is-a-democrat": _4, "is-a-designer": _4, "is-a-doctor": _4, "is-a-financialadvisor": _4, "is-a-geek": _4, "is-a-green": _4, "is-a-guru": _4, "is-a-hard-worker": _4, "is-a-hunter": _4, "is-a-landscaper": _4, "is-a-lawyer": _4, "is-a-liberal": _4, "is-a-libertarian": _4, "is-a-llama": _4, "is-a-musician": _4, "is-a-nascarfan": _4, "is-a-nurse": _4, "is-a-painter": _4, "is-a-personaltrainer": _4, "is-a-photographer": _4, "is-a-player": _4, "is-a-republican": _4, "is-a-rockstar": _4, "is-a-socialist": _4, "is-a-student": _4, "is-a-teacher": _4, "is-a-techie": _4, "is-a-therapist": _4, "is-an-accountant": _4, "is-an-actor": _4, "is-an-actress": _4, "is-an-anarchist": _4, "is-an-artist": _4, "is-an-engineer": _4, "is-an-entertainer": _4, "is-certified": _4, "is-gone": _4, "is-into-anime": _4, "is-into-cars": _4, "is-into-cartoons": _4, "is-into-games": _4, "is-leet": _4, "is-not-certified": _4, "is-slick": _4, "is-uberleet": _4, "is-with-theband": _4, "isa-geek": _4, "isa-hockeynut": _4, "issmarterthanyou": _4, "likes-pie": _4, "likescandy": _4, "neat-url": _4, "saves-the-whales": _4, "selfip": _4, "sells-for-less": _4, "sells-for-u": _4, "servebbs": _4, "simple-url": _4, "space-to-rent": _4, "teaches-yoga": _4, "writesthisblog": _4, "ddnsfree": _4, "ddnsgeek": _4, "giize": _4, "gleeze": _4, "kozow": _4, "loseyourip": _4, "ooguy": _4, "theworkpc": _4, "mytuleap": _4, "tuleap-partners": _4, "encoreapi": _4, "evennode": [0, { "eu-1": _4, "eu-2": _4, "eu-3": _4, "eu-4": _4, "us-1": _4, "us-2": _4, "us-3": _4, "us-4": _4 }], "onfabrica": _4, "fastly-edge": _4, "fastly-terrarium": _4, "fastvps-server": _4, "mydobiss": _4, "firebaseapp": _4, "fldrv": _4, "forgeblocks": _4, "framercanvas": _4, "freebox-os": _4, "freeboxos": _4, "freemyip": _4, "aliases121": _4, "gentapps": _4, "gentlentapis": _4, "githubusercontent": _4, "0emm": _7, "appspot": [2, { "r": _7 }], "blogspot": _4, "codespot": _4, "googleapis": _4, "googlecode": _4, "pagespeedmobilizer": _4, "withgoogle": _4, "withyoutube": _4, "grayjayleagues": _4, "hatenablog": _4, "hatenadiary": _4, "herokuapp": _4, "gr": _4, "smushcdn": _4, "wphostedmail": _4, "wpmucdn": _4, "pixolino": _4, "apps-1and1": _4, "live-website": _4, "dopaas": _4, "hosted-by-previder": _41, "hosteur": [0, { "rag-cloud": _4, "rag-cloud-ch": _4 }], "ik-server": [0, { "jcloud": _4, "jcloud-ver-jpc": _4 }], "jelastic": [0, { "demo": _4 }], "massivegrid": _41, "wafaicloud": [0, { "jed": _4, "ryd": _4 }], "webadorsite": _4, "joyent": [0, { "cns": _7 }], "lpusercontent": _4, "linode": [0, { "members": _4, "nodebalancer": _7 }], "linodeobjects": _7, "linodeusercontent": [0, { "ip": _4 }], "localtonet": _4, "lovableproject": _4, "barsycenter": _4, "barsyonline": _4, "modelscape": _4, "mwcloudnonprod": _4, "polyspace": _4, "mazeplay": _4, "miniserver": _4, "atmeta": _4, "fbsbx": _40, "meteorapp": _42, "routingthecloud": _4, "mydbserver": _4, "hostedpi": _4, "mythic-beasts": [0, { "caracal": _4, "customer": _4, "fentiger": _4, "lynx": _4, "ocelot": _4, "oncilla": _4, "onza": _4, "sphinx": _4, "vs": _4, "x": _4, "yali": _4 }], "nospamproxy": [0, { "cloud": [2, { "o365": _4 }] }], "4u": _4, "nfshost": _4, "3utilities": _4, "blogsyte": _4, "ciscofreak": _4, "damnserver": _4, "ddnsking": _4, "ditchyourip": _4, "dnsiskinky": _4, "dynns": _4, "geekgalaxy": _4, "health-carereform": _4, "homesecuritymac": _4, "homesecuritypc": _4, "myactivedirectory": _4, "mysecuritycamera": _4, "myvnc": _4, "net-freaks": _4, "onthewifi": _4, "point2this": _4, "quicksytes": _4, "securitytactics": _4, "servebeer": _4, "servecounterstrike": _4, "serveexchange": _4, "serveftp": _4, "servegame": _4, "servehalflife": _4, "servehttp": _4, "servehumour": _4, "serveirc": _4, "servemp3": _4, "servep2p": _4, "servepics": _4, "servequake": _4, "servesarcasm": _4, "stufftoread": _4, "unusualperson": _4, "workisboring": _4, "myiphost": _4, "observableusercontent": [0, { "static": _4 }], "simplesite": _4, "orsites": _4, "operaunite": _4, "customer-oci": [0, { "*": _4, "oci": _7, "ocp": _7, "ocs": _7 }], "oraclecloudapps": _7, "oraclegovcloudapps": _7, "authgear-staging": _4, "authgearapps": _4, "skygearapp": _4, "outsystemscloud": _4, "ownprovider": _4, "pgfog": _4, "pagexl": _4, "gotpantheon": _4, "paywhirl": _7, "upsunapp": _4, "postman-echo": _4, "prgmr": [0, { "xen": _4 }], "pythonanywhere": _42, "qa2": _4, "alpha-myqnapcloud": _4, "dev-myqnapcloud": _4, "mycloudnas": _4, "mynascloud": _4, "myqnapcloud": _4, "qualifioapp": _4, "ladesk": _4, "qbuser": _4, "quipelements": _7, "rackmaze": _4, "readthedocs-hosted": _4, "rhcloud": _4, "onrender": _4, "render": _43, "subsc-pay": _4, "180r": _4, "dojin": _4, "sakuratan": _4, "sakuraweb": _4, "x0": _4, "code": [0, { "builder": _7, "dev-builder": _7, "stg-builder": _7 }], "salesforce": [0, { "platform": [0, { "code-builder-stg": [0, { "test": [0, { "001": _7 }] }] }] }], "logoip": _4, "scrysec": _4, "firewall-gateway": _4, "myshopblocks": _4, "myshopify": _4, "shopitsite": _4, "1kapp": _4, "appchizi": _4, "applinzi": _4, "sinaapp": _4, "vipsinaapp": _4, "streamlitapp": _4, "try-snowplow": _4, "playstation-cloud": _4, "myspreadshop": _4, "w-corp-staticblitz": _4, "w-credentialless-staticblitz": _4, "w-staticblitz": _4, "stackhero-network": _4, "stdlib": [0, { "api": _4 }], "strapiapp": [2, { "media": _4 }], "streak-link": _4, "streaklinks": _4, "streakusercontent": _4, "temp-dns": _4, "dsmynas": _4, "familyds": _4, "mytabit": _4, "taveusercontent": _4, "tb-hosting": _44, "reservd": _4, "thingdustdata": _4, "townnews-staging": _4, "typeform": [0, { "pro": _4 }], "hk": _4, "it": _4, "deus-canvas": _4, "vultrobjects": _7, "wafflecell": _4, "hotelwithflight": _4, "reserve-online": _4, "cprapid": _4, "pleskns": _4, "remotewd": _4, "wiardweb": [0, { "pages": _4 }], "wixsite": _4, "wixstudio": _4, "messwithdns": _4, "woltlab-demo": _4, "wpenginepowered": [2, { "js": _4 }], "xnbay": [2, { "u2": _4, "u2-local": _4 }], "yolasite": _4 }], "coop": _3, "cr": [1, { "ac": _3, "co": _3, "ed": _3, "fi": _3, "go": _3, "or": _3, "sa": _3 }], "cu": [1, { "com": _3, "edu": _3, "gob": _3, "inf": _3, "nat": _3, "net": _3, "org": _3 }], "cv": [1, { "com": _3, "edu": _3, "id": _3, "int": _3, "net": _3, "nome": _3, "org": _3, "publ": _3 }], "cw": _45, "cx": [1, { "gov": _3, "cloudns": _4, "ath": _4, "info": _4, "assessments": _4, "calculators": _4, "funnels": _4, "paynow": _4, "quizzes": _4, "researched": _4, "tests": _4 }], "cy": [1, { "ac": _3, "biz": _3, "com": [1, { "scaleforce": _46 }], "ekloges": _3, "gov": _3, "ltd": _3, "mil": _3, "net": _3, "org": _3, "press": _3, "pro": _3, "tm": _3 }], "cz": [1, { "contentproxy9": [0, { "rsc": _4 }], "realm": _4, "e4": _4, "co": _4, "metacentrum": [0, { "cloud": _7, "custom": _4 }], "muni": [0, { "cloud": [0, { "flt": _4, "usr": _4 }] }] }], "de": [1, { "bplaced": _4, "square7": _4, "com": _4, "cosidns": _47, "dnsupdater": _4, "dynamisches-dns": _4, "internet-dns": _4, "l-o-g-i-n": _4, "ddnss": [2, { "dyn": _4, "dyndns": _4 }], "dyn-ip24": _4, "dyndns1": _4, "home-webserver": [2, { "dyn": _4 }], "myhome-server": _4, "dnshome": _4, "fuettertdasnetz": _4, "isteingeek": _4, "istmein": _4, "lebtimnetz": _4, "leitungsen": _4, "traeumtgerade": _4, "frusky": _7, "goip": _4, "xn--gnstigbestellen-zvb": _4, "g\xFCnstigbestellen": _4, "xn--gnstigliefern-wob": _4, "g\xFCnstigliefern": _4, "hs-heilbronn": [0, { "it": [0, { "pages": _4, "pages-research": _4 }] }], "dyn-berlin": _4, "in-berlin": _4, "in-brb": _4, "in-butter": _4, "in-dsl": _4, "in-vpn": _4, "iservschule": _4, "mein-iserv": _4, "schulplattform": _4, "schulserver": _4, "test-iserv": _4, "keymachine": _4, "git-repos": _4, "lcube-server": _4, "svn-repos": _4, "barsy": _4, "webspaceconfig": _4, "123webseite": _4, "rub": _4, "ruhr-uni-bochum": [2, { "noc": [0, { "io": _4 }] }], "logoip": _4, "firewall-gateway": _4, "my-gateway": _4, "my-router": _4, "spdns": _4, "speedpartner": [0, { "customer": _4 }], "myspreadshop": _4, "taifun-dns": _4, "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4, "dd-dns": _4, "dray-dns": _4, "draydns": _4, "dyn-vpn": _4, "dynvpn": _4, "mein-vigor": _4, "my-vigor": _4, "my-wan": _4, "syno-ds": _4, "synology-diskstation": _4, "synology-ds": _4, "uberspace": _7, "virtual-user": _4, "virtualuser": _4, "community-pro": _4, "diskussionsbereich": _4 }], "dj": _3, "dk": [1, { "biz": _4, "co": _4, "firm": _4, "reg": _4, "store": _4, "123hjemmeside": _4, "myspreadshop": _4 }], "dm": _48, "do": [1, { "art": _3, "com": _3, "edu": _3, "gob": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "sld": _3, "web": _3 }], "dz": [1, { "art": _3, "asso": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "pol": _3, "soc": _3, "tm": _3 }], "ec": [1, { "com": _3, "edu": _3, "fin": _3, "gob": _3, "gov": _3, "info": _3, "k12": _3, "med": _3, "mil": _3, "net": _3, "org": _3, "pro": _3, "base": _4, "official": _4 }], "edu": [1, { "rit": [0, { "git-pages": _4 }] }], "ee": [1, { "aip": _3, "com": _3, "edu": _3, "fie": _3, "gov": _3, "lib": _3, "med": _3, "org": _3, "pri": _3, "riik": _3 }], "eg": [1, { "ac": _3, "com": _3, "edu": _3, "eun": _3, "gov": _3, "info": _3, "me": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "sci": _3, "sport": _3, "tv": _3 }], "er": _18, "es": [1, { "com": _3, "edu": _3, "gob": _3, "nom": _3, "org": _3, "123miweb": _4, "myspreadshop": _4 }], "et": [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "name": _3, "net": _3, "org": _3 }], "eu": [1, { "airkitapps": _4, "cloudns": _4, "dogado": [0, { "jelastic": _4 }], "barsy": _4, "spdns": _4, "transurl": _7, "diskstation": _4 }], "fi": [1, { "aland": _3, "dy": _4, "xn--hkkinen-5wa": _4, "h\xE4kkinen": _4, "iki": _4, "cloudplatform": [0, { "fi": _4 }], "datacenter": [0, { "demo": _4, "paas": _4 }], "kapsi": _4, "123kotisivu": _4, "myspreadshop": _4 }], "fj": [1, { "ac": _3, "biz": _3, "com": _3, "gov": _3, "info": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pro": _3 }], "fk": _18, "fm": [1, { "com": _3, "edu": _3, "net": _3, "org": _3, "radio": _4, "user": _7 }], "fo": _3, "fr": [1, { "asso": _3, "com": _3, "gouv": _3, "nom": _3, "prd": _3, "tm": _3, "avoues": _3, "cci": _3, "greta": _3, "huissier-justice": _3, "en-root": _4, "fbx-os": _4, "fbxos": _4, "freebox-os": _4, "freeboxos": _4, "goupile": _4, "123siteweb": _4, "on-web": _4, "chirurgiens-dentistes-en-france": _4, "dedibox": _4, "aeroport": _4, "avocat": _4, "chambagri": _4, "chirurgiens-dentistes": _4, "experts-comptables": _4, "medecin": _4, "notaires": _4, "pharmacien": _4, "port": _4, "veterinaire": _4, "myspreadshop": _4, "ynh": _4 }], "ga": _3, "gb": _3, "gd": [1, { "edu": _3, "gov": _3 }], "ge": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "pvt": _3, "school": _3 }], "gf": _3, "gg": [1, { "co": _3, "net": _3, "org": _3, "botdash": _4, "kaas": _4, "stackit": _4, "panel": [2, { "daemon": _4 }] }], "gh": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "org": _3 }], "gi": [1, { "com": _3, "edu": _3, "gov": _3, "ltd": _3, "mod": _3, "org": _3 }], "gl": [1, { "co": _3, "com": _3, "edu": _3, "net": _3, "org": _3, "biz": _4 }], "gm": _3, "gn": [1, { "ac": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], "gov": _3, "gp": [1, { "asso": _3, "com": _3, "edu": _3, "mobi": _3, "net": _3, "org": _3 }], "gq": _3, "gr": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "barsy": _4, "simplesite": _4 }], "gs": _3, "gt": [1, { "com": _3, "edu": _3, "gob": _3, "ind": _3, "mil": _3, "net": _3, "org": _3 }], "gu": [1, { "com": _3, "edu": _3, "gov": _3, "guam": _3, "info": _3, "net": _3, "org": _3, "web": _3 }], "gw": _3, "gy": _48, "hk": [1, { "com": _3, "edu": _3, "gov": _3, "idv": _3, "net": _3, "org": _3, "xn--ciqpn": _3, "\u4E2A\u4EBA": _3, "xn--gmqw5a": _3, "\u500B\u4EBA": _3, "xn--55qx5d": _3, "\u516C\u53F8": _3, "xn--mxtq1m": _3, "\u653F\u5E9C": _3, "xn--lcvr32d": _3, "\u654E\u80B2": _3, "xn--wcvs22d": _3, "\u6559\u80B2": _3, "xn--gmq050i": _3, "\u7B87\u4EBA": _3, "xn--uc0atv": _3, "\u7D44\u7E54": _3, "xn--uc0ay4a": _3, "\u7D44\u7EC7": _3, "xn--od0alg": _3, "\u7DB2\u7D61": _3, "xn--zf0avx": _3, "\u7DB2\u7EDC": _3, "xn--mk0axi": _3, "\u7EC4\u7E54": _3, "xn--tn0ag": _3, "\u7EC4\u7EC7": _3, "xn--od0aq3b": _3, "\u7F51\u7D61": _3, "xn--io0a7i": _3, "\u7F51\u7EDC": _3, "inc": _4, "ltd": _4 }], "hm": _3, "hn": [1, { "com": _3, "edu": _3, "gob": _3, "mil": _3, "net": _3, "org": _3 }], "hr": [1, { "com": _3, "from": _3, "iz": _3, "name": _3, "brendly": _51 }], "ht": [1, { "adult": _3, "art": _3, "asso": _3, "com": _3, "coop": _3, "edu": _3, "firm": _3, "gouv": _3, "info": _3, "med": _3, "net": _3, "org": _3, "perso": _3, "pol": _3, "pro": _3, "rel": _3, "shop": _3, "rt": _4 }], "hu": [1, { "2000": _3, "agrar": _3, "bolt": _3, "casino": _3, "city": _3, "co": _3, "erotica": _3, "erotika": _3, "film": _3, "forum": _3, "games": _3, "hotel": _3, "info": _3, "ingatlan": _3, "jogasz": _3, "konyvelo": _3, "lakas": _3, "media": _3, "news": _3, "org": _3, "priv": _3, "reklam": _3, "sex": _3, "shop": _3, "sport": _3, "suli": _3, "szex": _3, "tm": _3, "tozsde": _3, "utazas": _3, "video": _3 }], "id": [1, { "ac": _3, "biz": _3, "co": _3, "desa": _3, "go": _3, "mil": _3, "my": _3, "net": _3, "or": _3, "ponpes": _3, "sch": _3, "web": _3, "zone": _4 }], "ie": [1, { "gov": _3, "myspreadshop": _4 }], "il": [1, { "ac": _3, "co": [1, { "ravpage": _4, "mytabit": _4, "tabitorder": _4 }], "gov": _3, "idf": _3, "k12": _3, "muni": _3, "net": _3, "org": _3 }], "xn--4dbrk0ce": [1, { "xn--4dbgdty6c": _3, "xn--5dbhl8d": _3, "xn--8dbq2a": _3, "xn--hebda8b": _3 }], "\u05D9\u05E9\u05E8\u05D0\u05DC": [1, { "\u05D0\u05E7\u05D3\u05DE\u05D9\u05D4": _3, "\u05D9\u05E9\u05D5\u05D1": _3, "\u05E6\u05D4\u05DC": _3, "\u05DE\u05DE\u05E9\u05DC": _3 }], "im": [1, { "ac": _3, "co": [1, { "ltd": _3, "plc": _3 }], "com": _3, "net": _3, "org": _3, "tt": _3, "tv": _3 }], "in": [1, { "5g": _3, "6g": _3, "ac": _3, "ai": _3, "am": _3, "bihar": _3, "biz": _3, "business": _3, "ca": _3, "cn": _3, "co": _3, "com": _3, "coop": _3, "cs": _3, "delhi": _3, "dr": _3, "edu": _3, "er": _3, "firm": _3, "gen": _3, "gov": _3, "gujarat": _3, "ind": _3, "info": _3, "int": _3, "internet": _3, "io": _3, "me": _3, "mil": _3, "net": _3, "nic": _3, "org": _3, "pg": _3, "post": _3, "pro": _3, "res": _3, "travel": _3, "tv": _3, "uk": _3, "up": _3, "us": _3, "cloudns": _4, "barsy": _4, "web": _4, "supabase": _4 }], "info": [1, { "cloudns": _4, "dynamic-dns": _4, "barrel-of-knowledge": _4, "barrell-of-knowledge": _4, "dyndns": _4, "for-our": _4, "groks-the": _4, "groks-this": _4, "here-for-more": _4, "knowsitall": _4, "selfip": _4, "webhop": _4, "barsy": _4, "mayfirst": _4, "mittwald": _4, "mittwaldserver": _4, "typo3server": _4, "dvrcam": _4, "ilovecollege": _4, "no-ip": _4, "forumz": _4, "nsupdate": _4, "dnsupdate": _4, "v-info": _4 }], "int": [1, { "eu": _3 }], "io": [1, { "2038": _4, "co": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "on-acorn": _7, "myaddr": _4, "apigee": _4, "b-data": _4, "beagleboard": _4, "bitbucket": _4, "bluebite": _4, "boxfuse": _4, "brave": _8, "browsersafetymark": _4, "bubble": _52, "bubbleapps": _4, "bigv": [0, { "uk0": _4 }], "cleverapps": _4, "cloudbeesusercontent": _4, "dappnode": [0, { "dyndns": _4 }], "darklang": _4, "definima": _4, "dedyn": _4, "fh-muenster": _4, "shw": _4, "forgerock": [0, { "id": _4 }], "github": _4, "gitlab": _4, "lolipop": _4, "hasura-app": _4, "hostyhosting": _4, "hypernode": _4, "moonscale": _7, "beebyte": _41, "beebyteapp": [0, { "sekd1": _4 }], "jele": _4, "webthings": _4, "loginline": _4, "barsy": _4, "azurecontainer": _7, "ngrok": [2, { "ap": _4, "au": _4, "eu": _4, "in": _4, "jp": _4, "sa": _4, "us": _4 }], "nodeart": [0, { "stage": _4 }], "pantheonsite": _4, "pstmn": [2, { "mock": _4 }], "protonet": _4, "qcx": [2, { "sys": _7 }], "qoto": _4, "vaporcloud": _4, "myrdbx": _4, "rb-hosting": _44, "on-k3s": _7, "on-rio": _7, "readthedocs": _4, "resindevice": _4, "resinstaging": [0, { "devices": _4 }], "hzc": _4, "sandcats": _4, "scrypted": [0, { "client": _4 }], "mo-siemens": _4, "lair": _40, "stolos": _7, "musician": _4, "utwente": _4, "edugit": _4, "telebit": _4, "thingdust": [0, { "dev": _53, "disrec": _53, "prod": _54, "testing": _53 }], "tickets": _4, "webflow": _4, "webflowtest": _4, "editorx": _4, "wixstudio": _4, "basicserver": _4, "virtualserver": _4 }], "iq": _6, "ir": [1, { "ac": _3, "co": _3, "gov": _3, "id": _3, "net": _3, "org": _3, "sch": _3, "xn--mgba3a4f16a": _3, "\u0627\u06CC\u0631\u0627\u0646": _3, "xn--mgba3a4fra": _3, "\u0627\u064A\u0631\u0627\u0646": _3, "arvanedge": _4 }], "is": _3, "it": [1, { "edu": _3, "gov": _3, "abr": _3, "abruzzo": _3, "aosta-valley": _3, "aostavalley": _3, "bas": _3, "basilicata": _3, "cal": _3, "calabria": _3, "cam": _3, "campania": _3, "emilia-romagna": _3, "emiliaromagna": _3, "emr": _3, "friuli-v-giulia": _3, "friuli-ve-giulia": _3, "friuli-vegiulia": _3, "friuli-venezia-giulia": _3, "friuli-veneziagiulia": _3, "friuli-vgiulia": _3, "friuliv-giulia": _3, "friulive-giulia": _3, "friulivegiulia": _3, "friulivenezia-giulia": _3, "friuliveneziagiulia": _3, "friulivgiulia": _3, "fvg": _3, "laz": _3, "lazio": _3, "lig": _3, "liguria": _3, "lom": _3, "lombardia": _3, "lombardy": _3, "lucania": _3, "mar": _3, "marche": _3, "mol": _3, "molise": _3, "piedmont": _3, "piemonte": _3, "pmn": _3, "pug": _3, "puglia": _3, "sar": _3, "sardegna": _3, "sardinia": _3, "sic": _3, "sicilia": _3, "sicily": _3, "taa": _3, "tos": _3, "toscana": _3, "trentin-sud-tirol": _3, "xn--trentin-sd-tirol-rzb": _3, "trentin-s\xFCd-tirol": _3, "trentin-sudtirol": _3, "xn--trentin-sdtirol-7vb": _3, "trentin-s\xFCdtirol": _3, "trentin-sued-tirol": _3, "trentin-suedtirol": _3, "trentino": _3, "trentino-a-adige": _3, "trentino-aadige": _3, "trentino-alto-adige": _3, "trentino-altoadige": _3, "trentino-s-tirol": _3, "trentino-stirol": _3, "trentino-sud-tirol": _3, "xn--trentino-sd-tirol-c3b": _3, "trentino-s\xFCd-tirol": _3, "trentino-sudtirol": _3, "xn--trentino-sdtirol-szb": _3, "trentino-s\xFCdtirol": _3, "trentino-sued-tirol": _3, "trentino-suedtirol": _3, "trentinoa-adige": _3, "trentinoaadige": _3, "trentinoalto-adige": _3, "trentinoaltoadige": _3, "trentinos-tirol": _3, "trentinostirol": _3, "trentinosud-tirol": _3, "xn--trentinosd-tirol-rzb": _3, "trentinos\xFCd-tirol": _3, "trentinosudtirol": _3, "xn--trentinosdtirol-7vb": _3, "trentinos\xFCdtirol": _3, "trentinosued-tirol": _3, "trentinosuedtirol": _3, "trentinsud-tirol": _3, "xn--trentinsd-tirol-6vb": _3, "trentins\xFCd-tirol": _3, "trentinsudtirol": _3, "xn--trentinsdtirol-nsb": _3, "trentins\xFCdtirol": _3, "trentinsued-tirol": _3, "trentinsuedtirol": _3, "tuscany": _3, "umb": _3, "umbria": _3, "val-d-aosta": _3, "val-daosta": _3, "vald-aosta": _3, "valdaosta": _3, "valle-aosta": _3, "valle-d-aosta": _3, "valle-daosta": _3, "valleaosta": _3, "valled-aosta": _3, "valledaosta": _3, "vallee-aoste": _3, "xn--valle-aoste-ebb": _3, "vall\xE9e-aoste": _3, "vallee-d-aoste": _3, "xn--valle-d-aoste-ehb": _3, "vall\xE9e-d-aoste": _3, "valleeaoste": _3, "xn--valleaoste-e7a": _3, "vall\xE9eaoste": _3, "valleedaoste": _3, "xn--valledaoste-ebb": _3, "vall\xE9edaoste": _3, "vao": _3, "vda": _3, "ven": _3, "veneto": _3, "ag": _3, "agrigento": _3, "al": _3, "alessandria": _3, "alto-adige": _3, "altoadige": _3, "an": _3, "ancona": _3, "andria-barletta-trani": _3, "andria-trani-barletta": _3, "andriabarlettatrani": _3, "andriatranibarletta": _3, "ao": _3, "aosta": _3, "aoste": _3, "ap": _3, "aq": _3, "aquila": _3, "ar": _3, "arezzo": _3, "ascoli-piceno": _3, "ascolipiceno": _3, "asti": _3, "at": _3, "av": _3, "avellino": _3, "ba": _3, "balsan": _3, "balsan-sudtirol": _3, "xn--balsan-sdtirol-nsb": _3, "balsan-s\xFCdtirol": _3, "balsan-suedtirol": _3, "bari": _3, "barletta-trani-andria": _3, "barlettatraniandria": _3, "belluno": _3, "benevento": _3, "bergamo": _3, "bg": _3, "bi": _3, "biella": _3, "bl": _3, "bn": _3, "bo": _3, "bologna": _3, "bolzano": _3, "bolzano-altoadige": _3, "bozen": _3, "bozen-sudtirol": _3, "xn--bozen-sdtirol-2ob": _3, "bozen-s\xFCdtirol": _3, "bozen-suedtirol": _3, "br": _3, "brescia": _3, "brindisi": _3, "bs": _3, "bt": _3, "bulsan": _3, "bulsan-sudtirol": _3, "xn--bulsan-sdtirol-nsb": _3, "bulsan-s\xFCdtirol": _3, "bulsan-suedtirol": _3, "bz": _3, "ca": _3, "cagliari": _3, "caltanissetta": _3, "campidano-medio": _3, "campidanomedio": _3, "campobasso": _3, "carbonia-iglesias": _3, "carboniaiglesias": _3, "carrara-massa": _3, "carraramassa": _3, "caserta": _3, "catania": _3, "catanzaro": _3, "cb": _3, "ce": _3, "cesena-forli": _3, "xn--cesena-forl-mcb": _3, "cesena-forl\xEC": _3, "cesenaforli": _3, "xn--cesenaforl-i8a": _3, "cesenaforl\xEC": _3, "ch": _3, "chieti": _3, "ci": _3, "cl": _3, "cn": _3, "co": _3, "como": _3, "cosenza": _3, "cr": _3, "cremona": _3, "crotone": _3, "cs": _3, "ct": _3, "cuneo": _3, "cz": _3, "dell-ogliastra": _3, "dellogliastra": _3, "en": _3, "enna": _3, "fc": _3, "fe": _3, "fermo": _3, "ferrara": _3, "fg": _3, "fi": _3, "firenze": _3, "florence": _3, "fm": _3, "foggia": _3, "forli-cesena": _3, "xn--forl-cesena-fcb": _3, "forl\xEC-cesena": _3, "forlicesena": _3, "xn--forlcesena-c8a": _3, "forl\xECcesena": _3, "fr": _3, "frosinone": _3, "ge": _3, "genoa": _3, "genova": _3, "go": _3, "gorizia": _3, "gr": _3, "grosseto": _3, "iglesias-carbonia": _3, "iglesiascarbonia": _3, "im": _3, "imperia": _3, "is": _3, "isernia": _3, "kr": _3, "la-spezia": _3, "laquila": _3, "laspezia": _3, "latina": _3, "lc": _3, "le": _3, "lecce": _3, "lecco": _3, "li": _3, "livorno": _3, "lo": _3, "lodi": _3, "lt": _3, "lu": _3, "lucca": _3, "macerata": _3, "mantova": _3, "massa-carrara": _3, "massacarrara": _3, "matera": _3, "mb": _3, "mc": _3, "me": _3, "medio-campidano": _3, "mediocampidano": _3, "messina": _3, "mi": _3, "milan": _3, "milano": _3, "mn": _3, "mo": _3, "modena": _3, "monza": _3, "monza-brianza": _3, "monza-e-della-brianza": _3, "monzabrianza": _3, "monzaebrianza": _3, "monzaedellabrianza": _3, "ms": _3, "mt": _3, "na": _3, "naples": _3, "napoli": _3, "no": _3, "novara": _3, "nu": _3, "nuoro": _3, "og": _3, "ogliastra": _3, "olbia-tempio": _3, "olbiatempio": _3, "or": _3, "oristano": _3, "ot": _3, "pa": _3, "padova": _3, "padua": _3, "palermo": _3, "parma": _3, "pavia": _3, "pc": _3, "pd": _3, "pe": _3, "perugia": _3, "pesaro-urbino": _3, "pesarourbino": _3, "pescara": _3, "pg": _3, "pi": _3, "piacenza": _3, "pisa": _3, "pistoia": _3, "pn": _3, "po": _3, "pordenone": _3, "potenza": _3, "pr": _3, "prato": _3, "pt": _3, "pu": _3, "pv": _3, "pz": _3, "ra": _3, "ragusa": _3, "ravenna": _3, "rc": _3, "re": _3, "reggio-calabria": _3, "reggio-emilia": _3, "reggiocalabria": _3, "reggioemilia": _3, "rg": _3, "ri": _3, "rieti": _3, "rimini": _3, "rm": _3, "rn": _3, "ro": _3, "roma": _3, "rome": _3, "rovigo": _3, "sa": _3, "salerno": _3, "sassari": _3, "savona": _3, "si": _3, "siena": _3, "siracusa": _3, "so": _3, "sondrio": _3, "sp": _3, "sr": _3, "ss": _3, "xn--sdtirol-n2a": _3, "s\xFCdtirol": _3, "suedtirol": _3, "sv": _3, "ta": _3, "taranto": _3, "te": _3, "tempio-olbia": _3, "tempioolbia": _3, "teramo": _3, "terni": _3, "tn": _3, "to": _3, "torino": _3, "tp": _3, "tr": _3, "trani-andria-barletta": _3, "trani-barletta-andria": _3, "traniandriabarletta": _3, "tranibarlettaandria": _3, "trapani": _3, "trento": _3, "treviso": _3, "trieste": _3, "ts": _3, "turin": _3, "tv": _3, "ud": _3, "udine": _3, "urbino-pesaro": _3, "urbinopesaro": _3, "va": _3, "varese": _3, "vb": _3, "vc": _3, "ve": _3, "venezia": _3, "venice": _3, "verbania": _3, "vercelli": _3, "verona": _3, "vi": _3, "vibo-valentia": _3, "vibovalentia": _3, "vicenza": _3, "viterbo": _3, "vr": _3, "vs": _3, "vt": _3, "vv": _3, "12chars": _4, "ibxos": _4, "iliadboxos": _4, "neen": [0, { "jc": _4 }], "123homepage": _4, "16-b": _4, "32-b": _4, "64-b": _4, "myspreadshop": _4, "syncloud": _4 }], "je": [1, { "co": _3, "net": _3, "org": _3, "of": _4 }], "jm": _18, "jo": [1, { "agri": _3, "ai": _3, "com": _3, "edu": _3, "eng": _3, "fm": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "per": _3, "phd": _3, "sch": _3, "tv": _3 }], "jobs": _3, "jp": [1, { "ac": _3, "ad": _3, "co": _3, "ed": _3, "go": _3, "gr": _3, "lg": _3, "ne": [1, { "aseinet": _50, "gehirn": _4, "ivory": _4, "mail-box": _4, "mints": _4, "mokuren": _4, "opal": _4, "sakura": _4, "sumomo": _4, "topaz": _4 }], "or": _3, "aichi": [1, { "aisai": _3, "ama": _3, "anjo": _3, "asuke": _3, "chiryu": _3, "chita": _3, "fuso": _3, "gamagori": _3, "handa": _3, "hazu": _3, "hekinan": _3, "higashiura": _3, "ichinomiya": _3, "inazawa": _3, "inuyama": _3, "isshiki": _3, "iwakura": _3, "kanie": _3, "kariya": _3, "kasugai": _3, "kira": _3, "kiyosu": _3, "komaki": _3, "konan": _3, "kota": _3, "mihama": _3, "miyoshi": _3, "nishio": _3, "nisshin": _3, "obu": _3, "oguchi": _3, "oharu": _3, "okazaki": _3, "owariasahi": _3, "seto": _3, "shikatsu": _3, "shinshiro": _3, "shitara": _3, "tahara": _3, "takahama": _3, "tobishima": _3, "toei": _3, "togo": _3, "tokai": _3, "tokoname": _3, "toyoake": _3, "toyohashi": _3, "toyokawa": _3, "toyone": _3, "toyota": _3, "tsushima": _3, "yatomi": _3 }], "akita": [1, { "akita": _3, "daisen": _3, "fujisato": _3, "gojome": _3, "hachirogata": _3, "happou": _3, "higashinaruse": _3, "honjo": _3, "honjyo": _3, "ikawa": _3, "kamikoani": _3, "kamioka": _3, "katagami": _3, "kazuno": _3, "kitaakita": _3, "kosaka": _3, "kyowa": _3, "misato": _3, "mitane": _3, "moriyoshi": _3, "nikaho": _3, "noshiro": _3, "odate": _3, "oga": _3, "ogata": _3, "semboku": _3, "yokote": _3, "yurihonjo": _3 }], "aomori": [1, { "aomori": _3, "gonohe": _3, "hachinohe": _3, "hashikami": _3, "hiranai": _3, "hirosaki": _3, "itayanagi": _3, "kuroishi": _3, "misawa": _3, "mutsu": _3, "nakadomari": _3, "noheji": _3, "oirase": _3, "owani": _3, "rokunohe": _3, "sannohe": _3, "shichinohe": _3, "shingo": _3, "takko": _3, "towada": _3, "tsugaru": _3, "tsuruta": _3 }], "chiba": [1, { "abiko": _3, "asahi": _3, "chonan": _3, "chosei": _3, "choshi": _3, "chuo": _3, "funabashi": _3, "futtsu": _3, "hanamigawa": _3, "ichihara": _3, "ichikawa": _3, "ichinomiya": _3, "inzai": _3, "isumi": _3, "kamagaya": _3, "kamogawa": _3, "kashiwa": _3, "katori": _3, "katsuura": _3, "kimitsu": _3, "kisarazu": _3, "kozaki": _3, "kujukuri": _3, "kyonan": _3, "matsudo": _3, "midori": _3, "mihama": _3, "minamiboso": _3, "mobara": _3, "mutsuzawa": _3, "nagara": _3, "nagareyama": _3, "narashino": _3, "narita": _3, "noda": _3, "oamishirasato": _3, "omigawa": _3, "onjuku": _3, "otaki": _3, "sakae": _3, "sakura": _3, "shimofusa": _3, "shirako": _3, "shiroi": _3, "shisui": _3, "sodegaura": _3, "sosa": _3, "tako": _3, "tateyama": _3, "togane": _3, "tohnosho": _3, "tomisato": _3, "urayasu": _3, "yachimata": _3, "yachiyo": _3, "yokaichiba": _3, "yokoshibahikari": _3, "yotsukaido": _3 }], "ehime": [1, { "ainan": _3, "honai": _3, "ikata": _3, "imabari": _3, "iyo": _3, "kamijima": _3, "kihoku": _3, "kumakogen": _3, "masaki": _3, "matsuno": _3, "matsuyama": _3, "namikata": _3, "niihama": _3, "ozu": _3, "saijo": _3, "seiyo": _3, "shikokuchuo": _3, "tobe": _3, "toon": _3, "uchiko": _3, "uwajima": _3, "yawatahama": _3 }], "fukui": [1, { "echizen": _3, "eiheiji": _3, "fukui": _3, "ikeda": _3, "katsuyama": _3, "mihama": _3, "minamiechizen": _3, "obama": _3, "ohi": _3, "ono": _3, "sabae": _3, "sakai": _3, "takahama": _3, "tsuruga": _3, "wakasa": _3 }], "fukuoka": [1, { "ashiya": _3, "buzen": _3, "chikugo": _3, "chikuho": _3, "chikujo": _3, "chikushino": _3, "chikuzen": _3, "chuo": _3, "dazaifu": _3, "fukuchi": _3, "hakata": _3, "higashi": _3, "hirokawa": _3, "hisayama": _3, "iizuka": _3, "inatsuki": _3, "kaho": _3, "kasuga": _3, "kasuya": _3, "kawara": _3, "keisen": _3, "koga": _3, "kurate": _3, "kurogi": _3, "kurume": _3, "minami": _3, "miyako": _3, "miyama": _3, "miyawaka": _3, "mizumaki": _3, "munakata": _3, "nakagawa": _3, "nakama": _3, "nishi": _3, "nogata": _3, "ogori": _3, "okagaki": _3, "okawa": _3, "oki": _3, "omuta": _3, "onga": _3, "onojo": _3, "oto": _3, "saigawa": _3, "sasaguri": _3, "shingu": _3, "shinyoshitomi": _3, "shonai": _3, "soeda": _3, "sue": _3, "tachiarai": _3, "tagawa": _3, "takata": _3, "toho": _3, "toyotsu": _3, "tsuiki": _3, "ukiha": _3, "umi": _3, "usui": _3, "yamada": _3, "yame": _3, "yanagawa": _3, "yukuhashi": _3 }], "fukushima": [1, { "aizubange": _3, "aizumisato": _3, "aizuwakamatsu": _3, "asakawa": _3, "bandai": _3, "date": _3, "fukushima": _3, "furudono": _3, "futaba": _3, "hanawa": _3, "higashi": _3, "hirata": _3, "hirono": _3, "iitate": _3, "inawashiro": _3, "ishikawa": _3, "iwaki": _3, "izumizaki": _3, "kagamiishi": _3, "kaneyama": _3, "kawamata": _3, "kitakata": _3, "kitashiobara": _3, "koori": _3, "koriyama": _3, "kunimi": _3, "miharu": _3, "mishima": _3, "namie": _3, "nango": _3, "nishiaizu": _3, "nishigo": _3, "okuma": _3, "omotego": _3, "ono": _3, "otama": _3, "samegawa": _3, "shimogo": _3, "shirakawa": _3, "showa": _3, "soma": _3, "sukagawa": _3, "taishin": _3, "tamakawa": _3, "tanagura": _3, "tenei": _3, "yabuki": _3, "yamato": _3, "yamatsuri": _3, "yanaizu": _3, "yugawa": _3 }], "gifu": [1, { "anpachi": _3, "ena": _3, "gifu": _3, "ginan": _3, "godo": _3, "gujo": _3, "hashima": _3, "hichiso": _3, "hida": _3, "higashishirakawa": _3, "ibigawa": _3, "ikeda": _3, "kakamigahara": _3, "kani": _3, "kasahara": _3, "kasamatsu": _3, "kawaue": _3, "kitagata": _3, "mino": _3, "minokamo": _3, "mitake": _3, "mizunami": _3, "motosu": _3, "nakatsugawa": _3, "ogaki": _3, "sakahogi": _3, "seki": _3, "sekigahara": _3, "shirakawa": _3, "tajimi": _3, "takayama": _3, "tarui": _3, "toki": _3, "tomika": _3, "wanouchi": _3, "yamagata": _3, "yaotsu": _3, "yoro": _3 }], "gunma": [1, { "annaka": _3, "chiyoda": _3, "fujioka": _3, "higashiagatsuma": _3, "isesaki": _3, "itakura": _3, "kanna": _3, "kanra": _3, "katashina": _3, "kawaba": _3, "kiryu": _3, "kusatsu": _3, "maebashi": _3, "meiwa": _3, "midori": _3, "minakami": _3, "naganohara": _3, "nakanojo": _3, "nanmoku": _3, "numata": _3, "oizumi": _3, "ora": _3, "ota": _3, "shibukawa": _3, "shimonita": _3, "shinto": _3, "showa": _3, "takasaki": _3, "takayama": _3, "tamamura": _3, "tatebayashi": _3, "tomioka": _3, "tsukiyono": _3, "tsumagoi": _3, "ueno": _3, "yoshioka": _3 }], "hiroshima": [1, { "asaminami": _3, "daiwa": _3, "etajima": _3, "fuchu": _3, "fukuyama": _3, "hatsukaichi": _3, "higashihiroshima": _3, "hongo": _3, "jinsekikogen": _3, "kaita": _3, "kui": _3, "kumano": _3, "kure": _3, "mihara": _3, "miyoshi": _3, "naka": _3, "onomichi": _3, "osakikamijima": _3, "otake": _3, "saka": _3, "sera": _3, "seranishi": _3, "shinichi": _3, "shobara": _3, "takehara": _3 }], "hokkaido": [1, { "abashiri": _3, "abira": _3, "aibetsu": _3, "akabira": _3, "akkeshi": _3, "asahikawa": _3, "ashibetsu": _3, "ashoro": _3, "assabu": _3, "atsuma": _3, "bibai": _3, "biei": _3, "bifuka": _3, "bihoro": _3, "biratori": _3, "chippubetsu": _3, "chitose": _3, "date": _3, "ebetsu": _3, "embetsu": _3, "eniwa": _3, "erimo": _3, "esan": _3, "esashi": _3, "fukagawa": _3, "fukushima": _3, "furano": _3, "furubira": _3, "haboro": _3, "hakodate": _3, "hamatonbetsu": _3, "hidaka": _3, "higashikagura": _3, "higashikawa": _3, "hiroo": _3, "hokuryu": _3, "hokuto": _3, "honbetsu": _3, "horokanai": _3, "horonobe": _3, "ikeda": _3, "imakane": _3, "ishikari": _3, "iwamizawa": _3, "iwanai": _3, "kamifurano": _3, "kamikawa": _3, "kamishihoro": _3, "kamisunagawa": _3, "kamoenai": _3, "kayabe": _3, "kembuchi": _3, "kikonai": _3, "kimobetsu": _3, "kitahiroshima": _3, "kitami": _3, "kiyosato": _3, "koshimizu": _3, "kunneppu": _3, "kuriyama": _3, "kuromatsunai": _3, "kushiro": _3, "kutchan": _3, "kyowa": _3, "mashike": _3, "matsumae": _3, "mikasa": _3, "minamifurano": _3, "mombetsu": _3, "moseushi": _3, "mukawa": _3, "muroran": _3, "naie": _3, "nakagawa": _3, "nakasatsunai": _3, "nakatombetsu": _3, "nanae": _3, "nanporo": _3, "nayoro": _3, "nemuro": _3, "niikappu": _3, "niki": _3, "nishiokoppe": _3, "noboribetsu": _3, "numata": _3, "obihiro": _3, "obira": _3, "oketo": _3, "okoppe": _3, "otaru": _3, "otobe": _3, "otofuke": _3, "otoineppu": _3, "oumu": _3, "ozora": _3, "pippu": _3, "rankoshi": _3, "rebun": _3, "rikubetsu": _3, "rishiri": _3, "rishirifuji": _3, "saroma": _3, "sarufutsu": _3, "shakotan": _3, "shari": _3, "shibecha": _3, "shibetsu": _3, "shikabe": _3, "shikaoi": _3, "shimamaki": _3, "shimizu": _3, "shimokawa": _3, "shinshinotsu": _3, "shintoku": _3, "shiranuka": _3, "shiraoi": _3, "shiriuchi": _3, "sobetsu": _3, "sunagawa": _3, "taiki": _3, "takasu": _3, "takikawa": _3, "takinoue": _3, "teshikaga": _3, "tobetsu": _3, "tohma": _3, "tomakomai": _3, "tomari": _3, "toya": _3, "toyako": _3, "toyotomi": _3, "toyoura": _3, "tsubetsu": _3, "tsukigata": _3, "urakawa": _3, "urausu": _3, "uryu": _3, "utashinai": _3, "wakkanai": _3, "wassamu": _3, "yakumo": _3, "yoichi": _3 }], "hyogo": [1, { "aioi": _3, "akashi": _3, "ako": _3, "amagasaki": _3, "aogaki": _3, "asago": _3, "ashiya": _3, "awaji": _3, "fukusaki": _3, "goshiki": _3, "harima": _3, "himeji": _3, "ichikawa": _3, "inagawa": _3, "itami": _3, "kakogawa": _3, "kamigori": _3, "kamikawa": _3, "kasai": _3, "kasuga": _3, "kawanishi": _3, "miki": _3, "minamiawaji": _3, "nishinomiya": _3, "nishiwaki": _3, "ono": _3, "sanda": _3, "sannan": _3, "sasayama": _3, "sayo": _3, "shingu": _3, "shinonsen": _3, "shiso": _3, "sumoto": _3, "taishi": _3, "taka": _3, "takarazuka": _3, "takasago": _3, "takino": _3, "tamba": _3, "tatsuno": _3, "toyooka": _3, "yabu": _3, "yashiro": _3, "yoka": _3, "yokawa": _3 }], "ibaraki": [1, { "ami": _3, "asahi": _3, "bando": _3, "chikusei": _3, "daigo": _3, "fujishiro": _3, "hitachi": _3, "hitachinaka": _3, "hitachiomiya": _3, "hitachiota": _3, "ibaraki": _3, "ina": _3, "inashiki": _3, "itako": _3, "iwama": _3, "joso": _3, "kamisu": _3, "kasama": _3, "kashima": _3, "kasumigaura": _3, "koga": _3, "miho": _3, "mito": _3, "moriya": _3, "naka": _3, "namegata": _3, "oarai": _3, "ogawa": _3, "omitama": _3, "ryugasaki": _3, "sakai": _3, "sakuragawa": _3, "shimodate": _3, "shimotsuma": _3, "shirosato": _3, "sowa": _3, "suifu": _3, "takahagi": _3, "tamatsukuri": _3, "tokai": _3, "tomobe": _3, "tone": _3, "toride": _3, "tsuchiura": _3, "tsukuba": _3, "uchihara": _3, "ushiku": _3, "yachiyo": _3, "yamagata": _3, "yawara": _3, "yuki": _3 }], "ishikawa": [1, { "anamizu": _3, "hakui": _3, "hakusan": _3, "kaga": _3, "kahoku": _3, "kanazawa": _3, "kawakita": _3, "komatsu": _3, "nakanoto": _3, "nanao": _3, "nomi": _3, "nonoichi": _3, "noto": _3, "shika": _3, "suzu": _3, "tsubata": _3, "tsurugi": _3, "uchinada": _3, "wajima": _3 }], "iwate": [1, { "fudai": _3, "fujisawa": _3, "hanamaki": _3, "hiraizumi": _3, "hirono": _3, "ichinohe": _3, "ichinoseki": _3, "iwaizumi": _3, "iwate": _3, "joboji": _3, "kamaishi": _3, "kanegasaki": _3, "karumai": _3, "kawai": _3, "kitakami": _3, "kuji": _3, "kunohe": _3, "kuzumaki": _3, "miyako": _3, "mizusawa": _3, "morioka": _3, "ninohe": _3, "noda": _3, "ofunato": _3, "oshu": _3, "otsuchi": _3, "rikuzentakata": _3, "shiwa": _3, "shizukuishi": _3, "sumita": _3, "tanohata": _3, "tono": _3, "yahaba": _3, "yamada": _3 }], "kagawa": [1, { "ayagawa": _3, "higashikagawa": _3, "kanonji": _3, "kotohira": _3, "manno": _3, "marugame": _3, "mitoyo": _3, "naoshima": _3, "sanuki": _3, "tadotsu": _3, "takamatsu": _3, "tonosho": _3, "uchinomi": _3, "utazu": _3, "zentsuji": _3 }], "kagoshima": [1, { "akune": _3, "amami": _3, "hioki": _3, "isa": _3, "isen": _3, "izumi": _3, "kagoshima": _3, "kanoya": _3, "kawanabe": _3, "kinko": _3, "kouyama": _3, "makurazaki": _3, "matsumoto": _3, "minamitane": _3, "nakatane": _3, "nishinoomote": _3, "satsumasendai": _3, "soo": _3, "tarumizu": _3, "yusui": _3 }], "kanagawa": [1, { "aikawa": _3, "atsugi": _3, "ayase": _3, "chigasaki": _3, "ebina": _3, "fujisawa": _3, "hadano": _3, "hakone": _3, "hiratsuka": _3, "isehara": _3, "kaisei": _3, "kamakura": _3, "kiyokawa": _3, "matsuda": _3, "minamiashigara": _3, "miura": _3, "nakai": _3, "ninomiya": _3, "odawara": _3, "oi": _3, "oiso": _3, "sagamihara": _3, "samukawa": _3, "tsukui": _3, "yamakita": _3, "yamato": _3, "yokosuka": _3, "yugawara": _3, "zama": _3, "zushi": _3 }], "kochi": [1, { "aki": _3, "geisei": _3, "hidaka": _3, "higashitsuno": _3, "ino": _3, "kagami": _3, "kami": _3, "kitagawa": _3, "kochi": _3, "mihara": _3, "motoyama": _3, "muroto": _3, "nahari": _3, "nakamura": _3, "nankoku": _3, "nishitosa": _3, "niyodogawa": _3, "ochi": _3, "okawa": _3, "otoyo": _3, "otsuki": _3, "sakawa": _3, "sukumo": _3, "susaki": _3, "tosa": _3, "tosashimizu": _3, "toyo": _3, "tsuno": _3, "umaji": _3, "yasuda": _3, "yusuhara": _3 }], "kumamoto": [1, { "amakusa": _3, "arao": _3, "aso": _3, "choyo": _3, "gyokuto": _3, "kamiamakusa": _3, "kikuchi": _3, "kumamoto": _3, "mashiki": _3, "mifune": _3, "minamata": _3, "minamioguni": _3, "nagasu": _3, "nishihara": _3, "oguni": _3, "ozu": _3, "sumoto": _3, "takamori": _3, "uki": _3, "uto": _3, "yamaga": _3, "yamato": _3, "yatsushiro": _3 }], "kyoto": [1, { "ayabe": _3, "fukuchiyama": _3, "higashiyama": _3, "ide": _3, "ine": _3, "joyo": _3, "kameoka": _3, "kamo": _3, "kita": _3, "kizu": _3, "kumiyama": _3, "kyotamba": _3, "kyotanabe": _3, "kyotango": _3, "maizuru": _3, "minami": _3, "minamiyamashiro": _3, "miyazu": _3, "muko": _3, "nagaokakyo": _3, "nakagyo": _3, "nantan": _3, "oyamazaki": _3, "sakyo": _3, "seika": _3, "tanabe": _3, "uji": _3, "ujitawara": _3, "wazuka": _3, "yamashina": _3, "yawata": _3 }], "mie": [1, { "asahi": _3, "inabe": _3, "ise": _3, "kameyama": _3, "kawagoe": _3, "kiho": _3, "kisosaki": _3, "kiwa": _3, "komono": _3, "kumano": _3, "kuwana": _3, "matsusaka": _3, "meiwa": _3, "mihama": _3, "minamiise": _3, "misugi": _3, "miyama": _3, "nabari": _3, "shima": _3, "suzuka": _3, "tado": _3, "taiki": _3, "taki": _3, "tamaki": _3, "toba": _3, "tsu": _3, "udono": _3, "ureshino": _3, "watarai": _3, "yokkaichi": _3 }], "miyagi": [1, { "furukawa": _3, "higashimatsushima": _3, "ishinomaki": _3, "iwanuma": _3, "kakuda": _3, "kami": _3, "kawasaki": _3, "marumori": _3, "matsushima": _3, "minamisanriku": _3, "misato": _3, "murata": _3, "natori": _3, "ogawara": _3, "ohira": _3, "onagawa": _3, "osaki": _3, "rifu": _3, "semine": _3, "shibata": _3, "shichikashuku": _3, "shikama": _3, "shiogama": _3, "shiroishi": _3, "tagajo": _3, "taiwa": _3, "tome": _3, "tomiya": _3, "wakuya": _3, "watari": _3, "yamamoto": _3, "zao": _3 }], "miyazaki": [1, { "aya": _3, "ebino": _3, "gokase": _3, "hyuga": _3, "kadogawa": _3, "kawaminami": _3, "kijo": _3, "kitagawa": _3, "kitakata": _3, "kitaura": _3, "kobayashi": _3, "kunitomi": _3, "kushima": _3, "mimata": _3, "miyakonojo": _3, "miyazaki": _3, "morotsuka": _3, "nichinan": _3, "nishimera": _3, "nobeoka": _3, "saito": _3, "shiiba": _3, "shintomi": _3, "takaharu": _3, "takanabe": _3, "takazaki": _3, "tsuno": _3 }], "nagano": [1, { "achi": _3, "agematsu": _3, "anan": _3, "aoki": _3, "asahi": _3, "azumino": _3, "chikuhoku": _3, "chikuma": _3, "chino": _3, "fujimi": _3, "hakuba": _3, "hara": _3, "hiraya": _3, "iida": _3, "iijima": _3, "iiyama": _3, "iizuna": _3, "ikeda": _3, "ikusaka": _3, "ina": _3, "karuizawa": _3, "kawakami": _3, "kiso": _3, "kisofukushima": _3, "kitaaiki": _3, "komagane": _3, "komoro": _3, "matsukawa": _3, "matsumoto": _3, "miasa": _3, "minamiaiki": _3, "minamimaki": _3, "minamiminowa": _3, "minowa": _3, "miyada": _3, "miyota": _3, "mochizuki": _3, "nagano": _3, "nagawa": _3, "nagiso": _3, "nakagawa": _3, "nakano": _3, "nozawaonsen": _3, "obuse": _3, "ogawa": _3, "okaya": _3, "omachi": _3, "omi": _3, "ookuwa": _3, "ooshika": _3, "otaki": _3, "otari": _3, "sakae": _3, "sakaki": _3, "saku": _3, "sakuho": _3, "shimosuwa": _3, "shinanomachi": _3, "shiojiri": _3, "suwa": _3, "suzaka": _3, "takagi": _3, "takamori": _3, "takayama": _3, "tateshina": _3, "tatsuno": _3, "togakushi": _3, "togura": _3, "tomi": _3, "ueda": _3, "wada": _3, "yamagata": _3, "yamanouchi": _3, "yasaka": _3, "yasuoka": _3 }], "nagasaki": [1, { "chijiwa": _3, "futsu": _3, "goto": _3, "hasami": _3, "hirado": _3, "iki": _3, "isahaya": _3, "kawatana": _3, "kuchinotsu": _3, "matsuura": _3, "nagasaki": _3, "obama": _3, "omura": _3, "oseto": _3, "saikai": _3, "sasebo": _3, "seihi": _3, "shimabara": _3, "shinkamigoto": _3, "togitsu": _3, "tsushima": _3, "unzen": _3 }], "nara": [1, { "ando": _3, "gose": _3, "heguri": _3, "higashiyoshino": _3, "ikaruga": _3, "ikoma": _3, "kamikitayama": _3, "kanmaki": _3, "kashiba": _3, "kashihara": _3, "katsuragi": _3, "kawai": _3, "kawakami": _3, "kawanishi": _3, "koryo": _3, "kurotaki": _3, "mitsue": _3, "miyake": _3, "nara": _3, "nosegawa": _3, "oji": _3, "ouda": _3, "oyodo": _3, "sakurai": _3, "sango": _3, "shimoichi": _3, "shimokitayama": _3, "shinjo": _3, "soni": _3, "takatori": _3, "tawaramoto": _3, "tenkawa": _3, "tenri": _3, "uda": _3, "yamatokoriyama": _3, "yamatotakada": _3, "yamazoe": _3, "yoshino": _3 }], "niigata": [1, { "aga": _3, "agano": _3, "gosen": _3, "itoigawa": _3, "izumozaki": _3, "joetsu": _3, "kamo": _3, "kariwa": _3, "kashiwazaki": _3, "minamiuonuma": _3, "mitsuke": _3, "muika": _3, "murakami": _3, "myoko": _3, "nagaoka": _3, "niigata": _3, "ojiya": _3, "omi": _3, "sado": _3, "sanjo": _3, "seiro": _3, "seirou": _3, "sekikawa": _3, "shibata": _3, "tagami": _3, "tainai": _3, "tochio": _3, "tokamachi": _3, "tsubame": _3, "tsunan": _3, "uonuma": _3, "yahiko": _3, "yoita": _3, "yuzawa": _3 }], "oita": [1, { "beppu": _3, "bungoono": _3, "bungotakada": _3, "hasama": _3, "hiji": _3, "himeshima": _3, "hita": _3, "kamitsue": _3, "kokonoe": _3, "kuju": _3, "kunisaki": _3, "kusu": _3, "oita": _3, "saiki": _3, "taketa": _3, "tsukumi": _3, "usa": _3, "usuki": _3, "yufu": _3 }], "okayama": [1, { "akaiwa": _3, "asakuchi": _3, "bizen": _3, "hayashima": _3, "ibara": _3, "kagamino": _3, "kasaoka": _3, "kibichuo": _3, "kumenan": _3, "kurashiki": _3, "maniwa": _3, "misaki": _3, "nagi": _3, "niimi": _3, "nishiawakura": _3, "okayama": _3, "satosho": _3, "setouchi": _3, "shinjo": _3, "shoo": _3, "soja": _3, "takahashi": _3, "tamano": _3, "tsuyama": _3, "wake": _3, "yakage": _3 }], "okinawa": [1, { "aguni": _3, "ginowan": _3, "ginoza": _3, "gushikami": _3, "haebaru": _3, "higashi": _3, "hirara": _3, "iheya": _3, "ishigaki": _3, "ishikawa": _3, "itoman": _3, "izena": _3, "kadena": _3, "kin": _3, "kitadaito": _3, "kitanakagusuku": _3, "kumejima": _3, "kunigami": _3, "minamidaito": _3, "motobu": _3, "nago": _3, "naha": _3, "nakagusuku": _3, "nakijin": _3, "nanjo": _3, "nishihara": _3, "ogimi": _3, "okinawa": _3, "onna": _3, "shimoji": _3, "taketomi": _3, "tarama": _3, "tokashiki": _3, "tomigusuku": _3, "tonaki": _3, "urasoe": _3, "uruma": _3, "yaese": _3, "yomitan": _3, "yonabaru": _3, "yonaguni": _3, "zamami": _3 }], "osaka": [1, { "abeno": _3, "chihayaakasaka": _3, "chuo": _3, "daito": _3, "fujiidera": _3, "habikino": _3, "hannan": _3, "higashiosaka": _3, "higashisumiyoshi": _3, "higashiyodogawa": _3, "hirakata": _3, "ibaraki": _3, "ikeda": _3, "izumi": _3, "izumiotsu": _3, "izumisano": _3, "kadoma": _3, "kaizuka": _3, "kanan": _3, "kashiwara": _3, "katano": _3, "kawachinagano": _3, "kishiwada": _3, "kita": _3, "kumatori": _3, "matsubara": _3, "minato": _3, "minoh": _3, "misaki": _3, "moriguchi": _3, "neyagawa": _3, "nishi": _3, "nose": _3, "osakasayama": _3, "sakai": _3, "sayama": _3, "sennan": _3, "settsu": _3, "shijonawate": _3, "shimamoto": _3, "suita": _3, "tadaoka": _3, "taishi": _3, "tajiri": _3, "takaishi": _3, "takatsuki": _3, "tondabayashi": _3, "toyonaka": _3, "toyono": _3, "yao": _3 }], "saga": [1, { "ariake": _3, "arita": _3, "fukudomi": _3, "genkai": _3, "hamatama": _3, "hizen": _3, "imari": _3, "kamimine": _3, "kanzaki": _3, "karatsu": _3, "kashima": _3, "kitagata": _3, "kitahata": _3, "kiyama": _3, "kouhoku": _3, "kyuragi": _3, "nishiarita": _3, "ogi": _3, "omachi": _3, "ouchi": _3, "saga": _3, "shiroishi": _3, "taku": _3, "tara": _3, "tosu": _3, "yoshinogari": _3 }], "saitama": [1, { "arakawa": _3, "asaka": _3, "chichibu": _3, "fujimi": _3, "fujimino": _3, "fukaya": _3, "hanno": _3, "hanyu": _3, "hasuda": _3, "hatogaya": _3, "hatoyama": _3, "hidaka": _3, "higashichichibu": _3, "higashimatsuyama": _3, "honjo": _3, "ina": _3, "iruma": _3, "iwatsuki": _3, "kamiizumi": _3, "kamikawa": _3, "kamisato": _3, "kasukabe": _3, "kawagoe": _3, "kawaguchi": _3, "kawajima": _3, "kazo": _3, "kitamoto": _3, "koshigaya": _3, "kounosu": _3, "kuki": _3, "kumagaya": _3, "matsubushi": _3, "minano": _3, "misato": _3, "miyashiro": _3, "miyoshi": _3, "moroyama": _3, "nagatoro": _3, "namegawa": _3, "niiza": _3, "ogano": _3, "ogawa": _3, "ogose": _3, "okegawa": _3, "omiya": _3, "otaki": _3, "ranzan": _3, "ryokami": _3, "saitama": _3, "sakado": _3, "satte": _3, "sayama": _3, "shiki": _3, "shiraoka": _3, "soka": _3, "sugito": _3, "toda": _3, "tokigawa": _3, "tokorozawa": _3, "tsurugashima": _3, "urawa": _3, "warabi": _3, "yashio": _3, "yokoze": _3, "yono": _3, "yorii": _3, "yoshida": _3, "yoshikawa": _3, "yoshimi": _3 }], "shiga": [1, { "aisho": _3, "gamo": _3, "higashiomi": _3, "hikone": _3, "koka": _3, "konan": _3, "kosei": _3, "koto": _3, "kusatsu": _3, "maibara": _3, "moriyama": _3, "nagahama": _3, "nishiazai": _3, "notogawa": _3, "omihachiman": _3, "otsu": _3, "ritto": _3, "ryuoh": _3, "takashima": _3, "takatsuki": _3, "torahime": _3, "toyosato": _3, "yasu": _3 }], "shimane": [1, { "akagi": _3, "ama": _3, "gotsu": _3, "hamada": _3, "higashiizumo": _3, "hikawa": _3, "hikimi": _3, "izumo": _3, "kakinoki": _3, "masuda": _3, "matsue": _3, "misato": _3, "nishinoshima": _3, "ohda": _3, "okinoshima": _3, "okuizumo": _3, "shimane": _3, "tamayu": _3, "tsuwano": _3, "unnan": _3, "yakumo": _3, "yasugi": _3, "yatsuka": _3 }], "shizuoka": [1, { "arai": _3, "atami": _3, "fuji": _3, "fujieda": _3, "fujikawa": _3, "fujinomiya": _3, "fukuroi": _3, "gotemba": _3, "haibara": _3, "hamamatsu": _3, "higashiizu": _3, "ito": _3, "iwata": _3, "izu": _3, "izunokuni": _3, "kakegawa": _3, "kannami": _3, "kawanehon": _3, "kawazu": _3, "kikugawa": _3, "kosai": _3, "makinohara": _3, "matsuzaki": _3, "minamiizu": _3, "mishima": _3, "morimachi": _3, "nishiizu": _3, "numazu": _3, "omaezaki": _3, "shimada": _3, "shimizu": _3, "shimoda": _3, "shizuoka": _3, "susono": _3, "yaizu": _3, "yoshida": _3 }], "tochigi": [1, { "ashikaga": _3, "bato": _3, "haga": _3, "ichikai": _3, "iwafune": _3, "kaminokawa": _3, "kanuma": _3, "karasuyama": _3, "kuroiso": _3, "mashiko": _3, "mibu": _3, "moka": _3, "motegi": _3, "nasu": _3, "nasushiobara": _3, "nikko": _3, "nishikata": _3, "nogi": _3, "ohira": _3, "ohtawara": _3, "oyama": _3, "sakura": _3, "sano": _3, "shimotsuke": _3, "shioya": _3, "takanezawa": _3, "tochigi": _3, "tsuga": _3, "ujiie": _3, "utsunomiya": _3, "yaita": _3 }], "tokushima": [1, { "aizumi": _3, "anan": _3, "ichiba": _3, "itano": _3, "kainan": _3, "komatsushima": _3, "matsushige": _3, "mima": _3, "minami": _3, "miyoshi": _3, "mugi": _3, "nakagawa": _3, "naruto": _3, "sanagochi": _3, "shishikui": _3, "tokushima": _3, "wajiki": _3 }], "tokyo": [1, { "adachi": _3, "akiruno": _3, "akishima": _3, "aogashima": _3, "arakawa": _3, "bunkyo": _3, "chiyoda": _3, "chofu": _3, "chuo": _3, "edogawa": _3, "fuchu": _3, "fussa": _3, "hachijo": _3, "hachioji": _3, "hamura": _3, "higashikurume": _3, "higashimurayama": _3, "higashiyamato": _3, "hino": _3, "hinode": _3, "hinohara": _3, "inagi": _3, "itabashi": _3, "katsushika": _3, "kita": _3, "kiyose": _3, "kodaira": _3, "koganei": _3, "kokubunji": _3, "komae": _3, "koto": _3, "kouzushima": _3, "kunitachi": _3, "machida": _3, "meguro": _3, "minato": _3, "mitaka": _3, "mizuho": _3, "musashimurayama": _3, "musashino": _3, "nakano": _3, "nerima": _3, "ogasawara": _3, "okutama": _3, "ome": _3, "oshima": _3, "ota": _3, "setagaya": _3, "shibuya": _3, "shinagawa": _3, "shinjuku": _3, "suginami": _3, "sumida": _3, "tachikawa": _3, "taito": _3, "tama": _3, "toshima": _3 }], "tottori": [1, { "chizu": _3, "hino": _3, "kawahara": _3, "koge": _3, "kotoura": _3, "misasa": _3, "nanbu": _3, "nichinan": _3, "sakaiminato": _3, "tottori": _3, "wakasa": _3, "yazu": _3, "yonago": _3 }], "toyama": [1, { "asahi": _3, "fuchu": _3, "fukumitsu": _3, "funahashi": _3, "himi": _3, "imizu": _3, "inami": _3, "johana": _3, "kamiichi": _3, "kurobe": _3, "nakaniikawa": _3, "namerikawa": _3, "nanto": _3, "nyuzen": _3, "oyabe": _3, "taira": _3, "takaoka": _3, "tateyama": _3, "toga": _3, "tonami": _3, "toyama": _3, "unazuki": _3, "uozu": _3, "yamada": _3 }], "wakayama": [1, { "arida": _3, "aridagawa": _3, "gobo": _3, "hashimoto": _3, "hidaka": _3, "hirogawa": _3, "inami": _3, "iwade": _3, "kainan": _3, "kamitonda": _3, "katsuragi": _3, "kimino": _3, "kinokawa": _3, "kitayama": _3, "koya": _3, "koza": _3, "kozagawa": _3, "kudoyama": _3, "kushimoto": _3, "mihama": _3, "misato": _3, "nachikatsuura": _3, "shingu": _3, "shirahama": _3, "taiji": _3, "tanabe": _3, "wakayama": _3, "yuasa": _3, "yura": _3 }], "yamagata": [1, { "asahi": _3, "funagata": _3, "higashine": _3, "iide": _3, "kahoku": _3, "kaminoyama": _3, "kaneyama": _3, "kawanishi": _3, "mamurogawa": _3, "mikawa": _3, "murayama": _3, "nagai": _3, "nakayama": _3, "nanyo": _3, "nishikawa": _3, "obanazawa": _3, "oe": _3, "oguni": _3, "ohkura": _3, "oishida": _3, "sagae": _3, "sakata": _3, "sakegawa": _3, "shinjo": _3, "shirataka": _3, "shonai": _3, "takahata": _3, "tendo": _3, "tozawa": _3, "tsuruoka": _3, "yamagata": _3, "yamanobe": _3, "yonezawa": _3, "yuza": _3 }], "yamaguchi": [1, { "abu": _3, "hagi": _3, "hikari": _3, "hofu": _3, "iwakuni": _3, "kudamatsu": _3, "mitou": _3, "nagato": _3, "oshima": _3, "shimonoseki": _3, "shunan": _3, "tabuse": _3, "tokuyama": _3, "toyota": _3, "ube": _3, "yuu": _3 }], "yamanashi": [1, { "chuo": _3, "doshi": _3, "fuefuki": _3, "fujikawa": _3, "fujikawaguchiko": _3, "fujiyoshida": _3, "hayakawa": _3, "hokuto": _3, "ichikawamisato": _3, "kai": _3, "kofu": _3, "koshu": _3, "kosuge": _3, "minami-alps": _3, "minobu": _3, "nakamichi": _3, "nanbu": _3, "narusawa": _3, "nirasaki": _3, "nishikatsura": _3, "oshino": _3, "otsuki": _3, "showa": _3, "tabayama": _3, "tsuru": _3, "uenohara": _3, "yamanakako": _3, "yamanashi": _3 }], "xn--ehqz56n": _3, "\u4E09\u91CD": _3, "xn--1lqs03n": _3, "\u4EAC\u90FD": _3, "xn--qqqt11m": _3, "\u4F50\u8CC0": _3, "xn--f6qx53a": _3, "\u5175\u5EAB": _3, "xn--djrs72d6uy": _3, "\u5317\u6D77\u9053": _3, "xn--mkru45i": _3, "\u5343\u8449": _3, "xn--0trq7p7nn": _3, "\u548C\u6B4C\u5C71": _3, "xn--5js045d": _3, "\u57FC\u7389": _3, "xn--kbrq7o": _3, "\u5927\u5206": _3, "xn--pssu33l": _3, "\u5927\u962A": _3, "xn--ntsq17g": _3, "\u5948\u826F": _3, "xn--uisz3g": _3, "\u5BAE\u57CE": _3, "xn--6btw5a": _3, "\u5BAE\u5D0E": _3, "xn--1ctwo": _3, "\u5BCC\u5C71": _3, "xn--6orx2r": _3, "\u5C71\u53E3": _3, "xn--rht61e": _3, "\u5C71\u5F62": _3, "xn--rht27z": _3, "\u5C71\u68A8": _3, "xn--nit225k": _3, "\u5C90\u961C": _3, "xn--rht3d": _3, "\u5CA1\u5C71": _3, "xn--djty4k": _3, "\u5CA9\u624B": _3, "xn--klty5x": _3, "\u5CF6\u6839": _3, "xn--kltx9a": _3, "\u5E83\u5CF6": _3, "xn--kltp7d": _3, "\u5FB3\u5CF6": _3, "xn--c3s14m": _3, "\u611B\u5A9B": _3, "xn--vgu402c": _3, "\u611B\u77E5": _3, "xn--efvn9s": _3, "\u65B0\u6F5F": _3, "xn--1lqs71d": _3, "\u6771\u4EAC": _3, "xn--4pvxs": _3, "\u6803\u6728": _3, "xn--uuwu58a": _3, "\u6C96\u7E04": _3, "xn--zbx025d": _3, "\u6ECB\u8CC0": _3, "xn--8pvr4u": _3, "\u718A\u672C": _3, "xn--5rtp49c": _3, "\u77F3\u5DDD": _3, "xn--ntso0iqx3a": _3, "\u795E\u5948\u5DDD": _3, "xn--elqq16h": _3, "\u798F\u4E95": _3, "xn--4it168d": _3, "\u798F\u5CA1": _3, "xn--klt787d": _3, "\u798F\u5CF6": _3, "xn--rny31h": _3, "\u79CB\u7530": _3, "xn--7t0a264c": _3, "\u7FA4\u99AC": _3, "xn--uist22h": _3, "\u8328\u57CE": _3, "xn--8ltr62k": _3, "\u9577\u5D0E": _3, "xn--2m4a15e": _3, "\u9577\u91CE": _3, "xn--32vp30h": _3, "\u9752\u68EE": _3, "xn--4it797k": _3, "\u9759\u5CA1": _3, "xn--5rtq34k": _3, "\u9999\u5DDD": _3, "xn--k7yn95e": _3, "\u9AD8\u77E5": _3, "xn--tor131o": _3, "\u9CE5\u53D6": _3, "xn--d5qv7z876c": _3, "\u9E7F\u5150\u5CF6": _3, "kawasaki": _18, "kitakyushu": _18, "kobe": _18, "nagoya": _18, "sapporo": _18, "sendai": _18, "yokohama": _18, "buyshop": _4, "fashionstore": _4, "handcrafted": _4, "kawaiishop": _4, "supersale": _4, "theshop": _4, "0am": _4, "0g0": _4, "0j0": _4, "0t0": _4, "mydns": _4, "pgw": _4, "wjg": _4, "usercontent": _4, "angry": _4, "babyblue": _4, "babymilk": _4, "backdrop": _4, "bambina": _4, "bitter": _4, "blush": _4, "boo": _4, "boy": _4, "boyfriend": _4, "but": _4, "candypop": _4, "capoo": _4, "catfood": _4, "cheap": _4, "chicappa": _4, "chillout": _4, "chips": _4, "chowder": _4, "chu": _4, "ciao": _4, "cocotte": _4, "coolblog": _4, "cranky": _4, "cutegirl": _4, "daa": _4, "deca": _4, "deci": _4, "digick": _4, "egoism": _4, "fakefur": _4, "fem": _4, "flier": _4, "floppy": _4, "fool": _4, "frenchkiss": _4, "girlfriend": _4, "girly": _4, "gloomy": _4, "gonna": _4, "greater": _4, "hacca": _4, "heavy": _4, "her": _4, "hiho": _4, "hippy": _4, "holy": _4, "hungry": _4, "icurus": _4, "itigo": _4, "jellybean": _4, "kikirara": _4, "kill": _4, "kilo": _4, "kuron": _4, "littlestar": _4, "lolipopmc": _4, "lolitapunk": _4, "lomo": _4, "lovepop": _4, "lovesick": _4, "main": _4, "mods": _4, "mond": _4, "mongolian": _4, "moo": _4, "namaste": _4, "nikita": _4, "nobushi": _4, "noor": _4, "oops": _4, "parallel": _4, "parasite": _4, "pecori": _4, "peewee": _4, "penne": _4, "pepper": _4, "perma": _4, "pigboat": _4, "pinoko": _4, "punyu": _4, "pupu": _4, "pussycat": _4, "pya": _4, "raindrop": _4, "readymade": _4, "sadist": _4, "schoolbus": _4, "secret": _4, "staba": _4, "stripper": _4, "sub": _4, "sunnyday": _4, "thick": _4, "tonkotsu": _4, "under": _4, "upper": _4, "velvet": _4, "verse": _4, "versus": _4, "vivian": _4, "watson": _4, "weblike": _4, "whitesnow": _4, "zombie": _4, "hateblo": _4, "hatenablog": _4, "hatenadiary": _4, "2-d": _4, "bona": _4, "crap": _4, "daynight": _4, "eek": _4, "flop": _4, "halfmoon": _4, "jeez": _4, "matrix": _4, "mimoza": _4, "netgamers": _4, "nyanta": _4, "o0o0": _4, "rdy": _4, "rgr": _4, "rulez": _4, "sakurastorage": [0, { "isk01": _55, "isk02": _55 }], "saloon": _4, "sblo": _4, "skr": _4, "tank": _4, "uh-oh": _4, "undo": _4, "webaccel": [0, { "rs": _4, "user": _4 }], "websozai": _4, "xii": _4 }], "ke": [1, { "ac": _3, "co": _3, "go": _3, "info": _3, "me": _3, "mobi": _3, "ne": _3, "or": _3, "sc": _3 }], "kg": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "us": _4 }], "kh": _18, "ki": _56, "km": [1, { "ass": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "nom": _3, "org": _3, "prd": _3, "tm": _3, "asso": _3, "coop": _3, "gouv": _3, "medecin": _3, "notaires": _3, "pharmaciens": _3, "presse": _3, "veterinaire": _3 }], "kn": [1, { "edu": _3, "gov": _3, "net": _3, "org": _3 }], "kp": [1, { "com": _3, "edu": _3, "gov": _3, "org": _3, "rep": _3, "tra": _3 }], "kr": [1, { "ac": _3, "ai": _3, "co": _3, "es": _3, "go": _3, "hs": _3, "io": _3, "it": _3, "kg": _3, "me": _3, "mil": _3, "ms": _3, "ne": _3, "or": _3, "pe": _3, "re": _3, "sc": _3, "busan": _3, "chungbuk": _3, "chungnam": _3, "daegu": _3, "daejeon": _3, "gangwon": _3, "gwangju": _3, "gyeongbuk": _3, "gyeonggi": _3, "gyeongnam": _3, "incheon": _3, "jeju": _3, "jeonbuk": _3, "jeonnam": _3, "seoul": _3, "ulsan": _3, "c01": _4, "eliv-dns": _4 }], "kw": [1, { "com": _3, "edu": _3, "emb": _3, "gov": _3, "ind": _3, "net": _3, "org": _3 }], "ky": _45, "kz": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "jcloud": _4 }], "la": [1, { "com": _3, "edu": _3, "gov": _3, "info": _3, "int": _3, "net": _3, "org": _3, "per": _3, "bnr": _4 }], "lb": _5, "lc": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "oy": _4 }], "li": _3, "lk": [1, { "ac": _3, "assn": _3, "com": _3, "edu": _3, "gov": _3, "grp": _3, "hotel": _3, "int": _3, "ltd": _3, "net": _3, "ngo": _3, "org": _3, "sch": _3, "soc": _3, "web": _3 }], "lr": _5, "ls": [1, { "ac": _3, "biz": _3, "co": _3, "edu": _3, "gov": _3, "info": _3, "net": _3, "org": _3, "sc": _3 }], "lt": _11, "lu": [1, { "123website": _4 }], "lv": [1, { "asn": _3, "com": _3, "conf": _3, "edu": _3, "gov": _3, "id": _3, "mil": _3, "net": _3, "org": _3 }], "ly": [1, { "com": _3, "edu": _3, "gov": _3, "id": _3, "med": _3, "net": _3, "org": _3, "plc": _3, "sch": _3 }], "ma": [1, { "ac": _3, "co": _3, "gov": _3, "net": _3, "org": _3, "press": _3 }], "mc": [1, { "asso": _3, "tm": _3 }], "md": [1, { "ir": _4 }], "me": [1, { "ac": _3, "co": _3, "edu": _3, "gov": _3, "its": _3, "net": _3, "org": _3, "priv": _3, "c66": _4, "craft": _4, "edgestack": _4, "filegear": _4, "glitch": _4, "filegear-sg": _4, "lohmus": _4, "barsy": _4, "mcdir": _4, "brasilia": _4, "ddns": _4, "dnsfor": _4, "hopto": _4, "loginto": _4, "noip": _4, "webhop": _4, "soundcast": _4, "tcp4": _4, "vp4": _4, "diskstation": _4, "dscloud": _4, "i234": _4, "myds": _4, "synology": _4, "transip": _44, "nohost": _4 }], "mg": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "nom": _3, "org": _3, "prd": _3 }], "mh": _3, "mil": _3, "mk": [1, { "com": _3, "edu": _3, "gov": _3, "inf": _3, "name": _3, "net": _3, "org": _3 }], "ml": [1, { "ac": _3, "art": _3, "asso": _3, "com": _3, "edu": _3, "gouv": _3, "gov": _3, "info": _3, "inst": _3, "net": _3, "org": _3, "pr": _3, "presse": _3 }], "mm": _18, "mn": [1, { "edu": _3, "gov": _3, "org": _3, "nyc": _4 }], "mo": _5, "mobi": [1, { "barsy": _4, "dscloud": _4 }], "mp": [1, { "ju": _4 }], "mq": _3, "mr": _11, "ms": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "minisite": _4 }], "mt": _45, "mu": [1, { "ac": _3, "co": _3, "com": _3, "gov": _3, "net": _3, "or": _3, "org": _3 }], "museum": _3, "mv": [1, { "aero": _3, "biz": _3, "com": _3, "coop": _3, "edu": _3, "gov": _3, "info": _3, "int": _3, "mil": _3, "museum": _3, "name": _3, "net": _3, "org": _3, "pro": _3 }], "mw": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "coop": _3, "edu": _3, "gov": _3, "int": _3, "net": _3, "org": _3 }], "mx": [1, { "com": _3, "edu": _3, "gob": _3, "net": _3, "org": _3 }], "my": [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "name": _3, "net": _3, "org": _3 }], "mz": [1, { "ac": _3, "adv": _3, "co": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], "na": [1, { "alt": _3, "co": _3, "com": _3, "gov": _3, "net": _3, "org": _3 }], "name": [1, { "her": _59, "his": _59 }], "nc": [1, { "asso": _3, "nom": _3 }], "ne": _3, "net": [1, { "adobeaemcloud": _4, "adobeio-static": _4, "adobeioruntime": _4, "akadns": _4, "akamai": _4, "akamai-staging": _4, "akamaiedge": _4, "akamaiedge-staging": _4, "akamaihd": _4, "akamaihd-staging": _4, "akamaiorigin": _4, "akamaiorigin-staging": _4, "akamaized": _4, "akamaized-staging": _4, "edgekey": _4, "edgekey-staging": _4, "edgesuite": _4, "edgesuite-staging": _4, "alwaysdata": _4, "myamaze": _4, "cloudfront": _4, "appudo": _4, "atlassian-dev": [0, { "prod": _52 }], "myfritz": _4, "onavstack": _4, "shopselect": _4, "blackbaudcdn": _4, "boomla": _4, "bplaced": _4, "square7": _4, "cdn77": [0, { "r": _4 }], "cdn77-ssl": _4, "gb": _4, "hu": _4, "jp": _4, "se": _4, "uk": _4, "clickrising": _4, "ddns-ip": _4, "dns-cloud": _4, "dns-dynamic": _4, "cloudaccess": _4, "cloudflare": [2, { "cdn": _4 }], "cloudflareanycast": _52, "cloudflarecn": _52, "cloudflareglobal": _52, "ctfcloud": _4, "feste-ip": _4, "knx-server": _4, "static-access": _4, "cryptonomic": _7, "dattolocal": _4, "mydatto": _4, "debian": _4, "definima": _4, "deno": _4, "at-band-camp": _4, "blogdns": _4, "broke-it": _4, "buyshouses": _4, "dnsalias": _4, "dnsdojo": _4, "does-it": _4, "dontexist": _4, "dynalias": _4, "dynathome": _4, "endofinternet": _4, "from-az": _4, "from-co": _4, "from-la": _4, "from-ny": _4, "gets-it": _4, "ham-radio-op": _4, "homeftp": _4, "homeip": _4, "homelinux": _4, "homeunix": _4, "in-the-band": _4, "is-a-chef": _4, "is-a-geek": _4, "isa-geek": _4, "kicks-ass": _4, "office-on-the": _4, "podzone": _4, "scrapper-site": _4, "selfip": _4, "sells-it": _4, "servebbs": _4, "serveftp": _4, "thruhere": _4, "webhop": _4, "casacam": _4, "dynu": _4, "dynv6": _4, "twmail": _4, "ru": _4, "channelsdvr": [2, { "u": _4 }], "fastly": [0, { "freetls": _4, "map": _4, "prod": [0, { "a": _4, "global": _4 }], "ssl": [0, { "a": _4, "b": _4, "global": _4 }] }], "fastlylb": [2, { "map": _4 }], "edgeapp": _4, "keyword-on": _4, "live-on": _4, "server-on": _4, "cdn-edges": _4, "heteml": _4, "cloudfunctions": _4, "grafana-dev": _4, "iobb": _4, "moonscale": _4, "in-dsl": _4, "in-vpn": _4, "oninferno": _4, "botdash": _4, "apps-1and1": _4, "ipifony": _4, "cloudjiffy": [2, { "fra1-de": _4, "west1-us": _4 }], "elastx": [0, { "jls-sto1": _4, "jls-sto2": _4, "jls-sto3": _4 }], "massivegrid": [0, { "paas": [0, { "fr-1": _4, "lon-1": _4, "lon-2": _4, "ny-1": _4, "ny-2": _4, "sg-1": _4 }] }], "saveincloud": [0, { "jelastic": _4, "nordeste-idc": _4 }], "scaleforce": _46, "kinghost": _4, "uni5": _4, "krellian": _4, "ggff": _4, "localcert": _4, "localhostcert": _4, "localto": _7, "barsy": _4, "memset": _4, "azure-api": _4, "azure-mobile": _4, "azureedge": _4, "azurefd": _4, "azurestaticapps": [2, { "1": _4, "2": _4, "3": _4, "4": _4, "5": _4, "6": _4, "7": _4, "centralus": _4, "eastasia": _4, "eastus2": _4, "westeurope": _4, "westus2": _4 }], "azurewebsites": _4, "cloudapp": _4, "trafficmanager": _4, "windows": [0, { "core": [0, { "blob": _4 }], "servicebus": _4 }], "mynetname": [0, { "sn": _4 }], "routingthecloud": _4, "bounceme": _4, "ddns": _4, "eating-organic": _4, "mydissent": _4, "myeffect": _4, "mymediapc": _4, "mypsx": _4, "mysecuritycamera": _4, "nhlfan": _4, "no-ip": _4, "pgafan": _4, "privatizehealthinsurance": _4, "redirectme": _4, "serveblog": _4, "serveminecraft": _4, "sytes": _4, "dnsup": _4, "hicam": _4, "now-dns": _4, "ownip": _4, "vpndns": _4, "cloudycluster": _4, "ovh": [0, { "hosting": _7, "webpaas": _7 }], "rackmaze": _4, "myradweb": _4, "in": _4, "subsc-pay": _4, "squares": _4, "schokokeks": _4, "firewall-gateway": _4, "seidat": _4, "senseering": _4, "siteleaf": _4, "mafelo": _4, "myspreadshop": _4, "vps-host": [2, { "jelastic": [0, { "atl": _4, "njs": _4, "ric": _4 }] }], "srcf": [0, { "soc": _4, "user": _4 }], "supabase": _4, "dsmynas": _4, "familyds": _4, "ts": [2, { "c": _7 }], "torproject": [2, { "pages": _4 }], "vusercontent": _4, "reserve-online": _4, "community-pro": _4, "meinforum": _4, "yandexcloud": [2, { "storage": _4, "website": _4 }], "za": _4 }], "nf": [1, { "arts": _3, "com": _3, "firm": _3, "info": _3, "net": _3, "other": _3, "per": _3, "rec": _3, "store": _3, "web": _3 }], "ng": [1, { "com": _3, "edu": _3, "gov": _3, "i": _3, "mil": _3, "mobi": _3, "name": _3, "net": _3, "org": _3, "sch": _3, "biz": [2, { "co": _4, "dl": _4, "go": _4, "lg": _4, "on": _4 }], "col": _4, "firm": _4, "gen": _4, "ltd": _4, "ngo": _4, "plc": _4 }], "ni": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "edu": _3, "gob": _3, "in": _3, "info": _3, "int": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "web": _3 }], "nl": [1, { "co": _4, "hosting-cluster": _4, "gov": _4, "khplay": _4, "123website": _4, "myspreadshop": _4, "transurl": _7, "cistron": _4, "demon": _4 }], "no": [1, { "fhs": _3, "folkebibl": _3, "fylkesbibl": _3, "idrett": _3, "museum": _3, "priv": _3, "vgs": _3, "dep": _3, "herad": _3, "kommune": _3, "mil": _3, "stat": _3, "aa": _60, "ah": _60, "bu": _60, "fm": _60, "hl": _60, "hm": _60, "jan-mayen": _60, "mr": _60, "nl": _60, "nt": _60, "of": _60, "ol": _60, "oslo": _60, "rl": _60, "sf": _60, "st": _60, "svalbard": _60, "tm": _60, "tr": _60, "va": _60, "vf": _60, "akrehamn": _3, "xn--krehamn-dxa": _3, "\xE5krehamn": _3, "algard": _3, "xn--lgrd-poac": _3, "\xE5lg\xE5rd": _3, "arna": _3, "bronnoysund": _3, "xn--brnnysund-m8ac": _3, "br\xF8nn\xF8ysund": _3, "brumunddal": _3, "bryne": _3, "drobak": _3, "xn--drbak-wua": _3, "dr\xF8bak": _3, "egersund": _3, "fetsund": _3, "floro": _3, "xn--flor-jra": _3, "flor\xF8": _3, "fredrikstad": _3, "hokksund": _3, "honefoss": _3, "xn--hnefoss-q1a": _3, "h\xF8nefoss": _3, "jessheim": _3, "jorpeland": _3, "xn--jrpeland-54a": _3, "j\xF8rpeland": _3, "kirkenes": _3, "kopervik": _3, "krokstadelva": _3, "langevag": _3, "xn--langevg-jxa": _3, "langev\xE5g": _3, "leirvik": _3, "mjondalen": _3, "xn--mjndalen-64a": _3, "mj\xF8ndalen": _3, "mo-i-rana": _3, "mosjoen": _3, "xn--mosjen-eya": _3, "mosj\xF8en": _3, "nesoddtangen": _3, "orkanger": _3, "osoyro": _3, "xn--osyro-wua": _3, "os\xF8yro": _3, "raholt": _3, "xn--rholt-mra": _3, "r\xE5holt": _3, "sandnessjoen": _3, "xn--sandnessjen-ogb": _3, "sandnessj\xF8en": _3, "skedsmokorset": _3, "slattum": _3, "spjelkavik": _3, "stathelle": _3, "stavern": _3, "stjordalshalsen": _3, "xn--stjrdalshalsen-sqb": _3, "stj\xF8rdalshalsen": _3, "tananger": _3, "tranby": _3, "vossevangen": _3, "aarborte": _3, "aejrie": _3, "afjord": _3, "xn--fjord-lra": _3, "\xE5fjord": _3, "agdenes": _3, "akershus": _61, "aknoluokta": _3, "xn--koluokta-7ya57h": _3, "\xE1k\u014Boluokta": _3, "al": _3, "xn--l-1fa": _3, "\xE5l": _3, "alaheadju": _3, "xn--laheadju-7ya": _3, "\xE1laheadju": _3, "alesund": _3, "xn--lesund-hua": _3, "\xE5lesund": _3, "alstahaug": _3, "alta": _3, "xn--lt-liac": _3, "\xE1lt\xE1": _3, "alvdal": _3, "amli": _3, "xn--mli-tla": _3, "\xE5mli": _3, "amot": _3, "xn--mot-tla": _3, "\xE5mot": _3, "andasuolo": _3, "andebu": _3, "andoy": _3, "xn--andy-ira": _3, "and\xF8y": _3, "ardal": _3, "xn--rdal-poa": _3, "\xE5rdal": _3, "aremark": _3, "arendal": _3, "xn--s-1fa": _3, "\xE5s": _3, "aseral": _3, "xn--seral-lra": _3, "\xE5seral": _3, "asker": _3, "askim": _3, "askoy": _3, "xn--asky-ira": _3, "ask\xF8y": _3, "askvoll": _3, "asnes": _3, "xn--snes-poa": _3, "\xE5snes": _3, "audnedaln": _3, "aukra": _3, "aure": _3, "aurland": _3, "aurskog-holand": _3, "xn--aurskog-hland-jnb": _3, "aurskog-h\xF8land": _3, "austevoll": _3, "austrheim": _3, "averoy": _3, "xn--avery-yua": _3, "aver\xF8y": _3, "badaddja": _3, "xn--bdddj-mrabd": _3, "b\xE5d\xE5ddj\xE5": _3, "xn--brum-voa": _3, "b\xE6rum": _3, "bahcavuotna": _3, "xn--bhcavuotna-s4a": _3, "b\xE1hcavuotna": _3, "bahccavuotna": _3, "xn--bhccavuotna-k7a": _3, "b\xE1hccavuotna": _3, "baidar": _3, "xn--bidr-5nac": _3, "b\xE1id\xE1r": _3, "bajddar": _3, "xn--bjddar-pta": _3, "b\xE1jddar": _3, "balat": _3, "xn--blt-elab": _3, "b\xE1l\xE1t": _3, "balestrand": _3, "ballangen": _3, "balsfjord": _3, "bamble": _3, "bardu": _3, "barum": _3, "batsfjord": _3, "xn--btsfjord-9za": _3, "b\xE5tsfjord": _3, "bearalvahki": _3, "xn--bearalvhki-y4a": _3, "bearalv\xE1hki": _3, "beardu": _3, "beiarn": _3, "berg": _3, "bergen": _3, "berlevag": _3, "xn--berlevg-jxa": _3, "berlev\xE5g": _3, "bievat": _3, "xn--bievt-0qa": _3, "biev\xE1t": _3, "bindal": _3, "birkenes": _3, "bjarkoy": _3, "xn--bjarky-fya": _3, "bjark\xF8y": _3, "bjerkreim": _3, "bjugn": _3, "bodo": _3, "xn--bod-2na": _3, "bod\xF8": _3, "bokn": _3, "bomlo": _3, "xn--bmlo-gra": _3, "b\xF8mlo": _3, "bremanger": _3, "bronnoy": _3, "xn--brnny-wuac": _3, "br\xF8nn\xF8y": _3, "budejju": _3, "buskerud": _61, "bygland": _3, "bykle": _3, "cahcesuolo": _3, "xn--hcesuolo-7ya35b": _3, "\u010D\xE1hcesuolo": _3, "davvenjarga": _3, "xn--davvenjrga-y4a": _3, "davvenj\xE1rga": _3, "davvesiida": _3, "deatnu": _3, "dielddanuorri": _3, "divtasvuodna": _3, "divttasvuotna": _3, "donna": _3, "xn--dnna-gra": _3, "d\xF8nna": _3, "dovre": _3, "drammen": _3, "drangedal": _3, "dyroy": _3, "xn--dyry-ira": _3, "dyr\xF8y": _3, "eid": _3, "eidfjord": _3, "eidsberg": _3, "eidskog": _3, "eidsvoll": _3, "eigersund": _3, "elverum": _3, "enebakk": _3, "engerdal": _3, "etne": _3, "etnedal": _3, "evenassi": _3, "xn--eveni-0qa01ga": _3, "even\xE1\u0161\u0161i": _3, "evenes": _3, "evje-og-hornnes": _3, "farsund": _3, "fauske": _3, "fedje": _3, "fet": _3, "finnoy": _3, "xn--finny-yua": _3, "finn\xF8y": _3, "fitjar": _3, "fjaler": _3, "fjell": _3, "fla": _3, "xn--fl-zia": _3, "fl\xE5": _3, "flakstad": _3, "flatanger": _3, "flekkefjord": _3, "flesberg": _3, "flora": _3, "folldal": _3, "forde": _3, "xn--frde-gra": _3, "f\xF8rde": _3, "forsand": _3, "fosnes": _3, "xn--frna-woa": _3, "fr\xE6na": _3, "frana": _3, "frei": _3, "frogn": _3, "froland": _3, "frosta": _3, "froya": _3, "xn--frya-hra": _3, "fr\xF8ya": _3, "fuoisku": _3, "fuossko": _3, "fusa": _3, "fyresdal": _3, "gaivuotna": _3, "xn--givuotna-8ya": _3, "g\xE1ivuotna": _3, "galsa": _3, "xn--gls-elac": _3, "g\xE1ls\xE1": _3, "gamvik": _3, "gangaviika": _3, "xn--ggaviika-8ya47h": _3, "g\xE1\u014Bgaviika": _3, "gaular": _3, "gausdal": _3, "giehtavuoatna": _3, "gildeskal": _3, "xn--gildeskl-g0a": _3, "gildesk\xE5l": _3, "giske": _3, "gjemnes": _3, "gjerdrum": _3, "gjerstad": _3, "gjesdal": _3, "gjovik": _3, "xn--gjvik-wua": _3, "gj\xF8vik": _3, "gloppen": _3, "gol": _3, "gran": _3, "grane": _3, "granvin": _3, "gratangen": _3, "grimstad": _3, "grong": _3, "grue": _3, "gulen": _3, "guovdageaidnu": _3, "ha": _3, "xn--h-2fa": _3, "h\xE5": _3, "habmer": _3, "xn--hbmer-xqa": _3, "h\xE1bmer": _3, "hadsel": _3, "xn--hgebostad-g3a": _3, "h\xE6gebostad": _3, "hagebostad": _3, "halden": _3, "halsa": _3, "hamar": _3, "hamaroy": _3, "hammarfeasta": _3, "xn--hmmrfeasta-s4ac": _3, "h\xE1mm\xE1rfeasta": _3, "hammerfest": _3, "hapmir": _3, "xn--hpmir-xqa": _3, "h\xE1pmir": _3, "haram": _3, "hareid": _3, "harstad": _3, "hasvik": _3, "hattfjelldal": _3, "haugesund": _3, "hedmark": [0, { "os": _3, "valer": _3, "xn--vler-qoa": _3, "v\xE5ler": _3 }], "hemne": _3, "hemnes": _3, "hemsedal": _3, "hitra": _3, "hjartdal": _3, "hjelmeland": _3, "hobol": _3, "xn--hobl-ira": _3, "hob\xF8l": _3, "hof": _3, "hol": _3, "hole": _3, "holmestrand": _3, "holtalen": _3, "xn--holtlen-hxa": _3, "holt\xE5len": _3, "hordaland": [0, { "os": _3 }], "hornindal": _3, "horten": _3, "hoyanger": _3, "xn--hyanger-q1a": _3, "h\xF8yanger": _3, "hoylandet": _3, "xn--hylandet-54a": _3, "h\xF8ylandet": _3, "hurdal": _3, "hurum": _3, "hvaler": _3, "hyllestad": _3, "ibestad": _3, "inderoy": _3, "xn--indery-fya": _3, "inder\xF8y": _3, "iveland": _3, "ivgu": _3, "jevnaker": _3, "jolster": _3, "xn--jlster-bya": _3, "j\xF8lster": _3, "jondal": _3, "kafjord": _3, "xn--kfjord-iua": _3, "k\xE5fjord": _3, "karasjohka": _3, "xn--krjohka-hwab49j": _3, "k\xE1r\xE1\u0161johka": _3, "karasjok": _3, "karlsoy": _3, "karmoy": _3, "xn--karmy-yua": _3, "karm\xF8y": _3, "kautokeino": _3, "klabu": _3, "xn--klbu-woa": _3, "kl\xE6bu": _3, "klepp": _3, "kongsberg": _3, "kongsvinger": _3, "kraanghke": _3, "xn--kranghke-b0a": _3, "kr\xE5anghke": _3, "kragero": _3, "xn--krager-gya": _3, "krager\xF8": _3, "kristiansand": _3, "kristiansund": _3, "krodsherad": _3, "xn--krdsherad-m8a": _3, "kr\xF8dsherad": _3, "xn--kvfjord-nxa": _3, "kv\xE6fjord": _3, "xn--kvnangen-k0a": _3, "kv\xE6nangen": _3, "kvafjord": _3, "kvalsund": _3, "kvam": _3, "kvanangen": _3, "kvinesdal": _3, "kvinnherad": _3, "kviteseid": _3, "kvitsoy": _3, "xn--kvitsy-fya": _3, "kvits\xF8y": _3, "laakesvuemie": _3, "xn--lrdal-sra": _3, "l\xE6rdal": _3, "lahppi": _3, "xn--lhppi-xqa": _3, "l\xE1hppi": _3, "lardal": _3, "larvik": _3, "lavagis": _3, "lavangen": _3, "leangaviika": _3, "xn--leagaviika-52b": _3, "lea\u014Bgaviika": _3, "lebesby": _3, "leikanger": _3, "leirfjord": _3, "leka": _3, "leksvik": _3, "lenvik": _3, "lerdal": _3, "lesja": _3, "levanger": _3, "lier": _3, "lierne": _3, "lillehammer": _3, "lillesand": _3, "lindas": _3, "xn--linds-pra": _3, "lind\xE5s": _3, "lindesnes": _3, "loabat": _3, "xn--loabt-0qa": _3, "loab\xE1t": _3, "lodingen": _3, "xn--ldingen-q1a": _3, "l\xF8dingen": _3, "lom": _3, "loppa": _3, "lorenskog": _3, "xn--lrenskog-54a": _3, "l\xF8renskog": _3, "loten": _3, "xn--lten-gra": _3, "l\xF8ten": _3, "lund": _3, "lunner": _3, "luroy": _3, "xn--lury-ira": _3, "lur\xF8y": _3, "luster": _3, "lyngdal": _3, "lyngen": _3, "malatvuopmi": _3, "xn--mlatvuopmi-s4a": _3, "m\xE1latvuopmi": _3, "malselv": _3, "xn--mlselv-iua": _3, "m\xE5lselv": _3, "malvik": _3, "mandal": _3, "marker": _3, "marnardal": _3, "masfjorden": _3, "masoy": _3, "xn--msy-ula0h": _3, "m\xE5s\xF8y": _3, "matta-varjjat": _3, "xn--mtta-vrjjat-k7af": _3, "m\xE1tta-v\xE1rjjat": _3, "meland": _3, "meldal": _3, "melhus": _3, "meloy": _3, "xn--mely-ira": _3, "mel\xF8y": _3, "meraker": _3, "xn--merker-kua": _3, "mer\xE5ker": _3, "midsund": _3, "midtre-gauldal": _3, "moareke": _3, "xn--moreke-jua": _3, "mo\xE5reke": _3, "modalen": _3, "modum": _3, "molde": _3, "more-og-romsdal": [0, { "heroy": _3, "sande": _3 }], "xn--mre-og-romsdal-qqb": [0, { "xn--hery-ira": _3, "sande": _3 }], "m\xF8re-og-romsdal": [0, { "her\xF8y": _3, "sande": _3 }], "moskenes": _3, "moss": _3, "mosvik": _3, "muosat": _3, "xn--muost-0qa": _3, "muos\xE1t": _3, "naamesjevuemie": _3, "xn--nmesjevuemie-tcba": _3, "n\xE5\xE5mesjevuemie": _3, "xn--nry-yla5g": _3, "n\xE6r\xF8y": _3, "namdalseid": _3, "namsos": _3, "namsskogan": _3, "nannestad": _3, "naroy": _3, "narviika": _3, "narvik": _3, "naustdal": _3, "navuotna": _3, "xn--nvuotna-hwa": _3, "n\xE1vuotna": _3, "nedre-eiker": _3, "nesna": _3, "nesodden": _3, "nesseby": _3, "nesset": _3, "nissedal": _3, "nittedal": _3, "nord-aurdal": _3, "nord-fron": _3, "nord-odal": _3, "norddal": _3, "nordkapp": _3, "nordland": [0, { "bo": _3, "xn--b-5ga": _3, "b\xF8": _3, "heroy": _3, "xn--hery-ira": _3, "her\xF8y": _3 }], "nordre-land": _3, "nordreisa": _3, "nore-og-uvdal": _3, "notodden": _3, "notteroy": _3, "xn--nttery-byae": _3, "n\xF8tter\xF8y": _3, "odda": _3, "oksnes": _3, "xn--ksnes-uua": _3, "\xF8ksnes": _3, "omasvuotna": _3, "oppdal": _3, "oppegard": _3, "xn--oppegrd-ixa": _3, "oppeg\xE5rd": _3, "orkdal": _3, "orland": _3, "xn--rland-uua": _3, "\xF8rland": _3, "orskog": _3, "xn--rskog-uua": _3, "\xF8rskog": _3, "orsta": _3, "xn--rsta-fra": _3, "\xF8rsta": _3, "osen": _3, "osteroy": _3, "xn--ostery-fya": _3, "oster\xF8y": _3, "ostfold": [0, { "valer": _3 }], "xn--stfold-9xa": [0, { "xn--vler-qoa": _3 }], "\xF8stfold": [0, { "v\xE5ler": _3 }], "ostre-toten": _3, "xn--stre-toten-zcb": _3, "\xF8stre-toten": _3, "overhalla": _3, "ovre-eiker": _3, "xn--vre-eiker-k8a": _3, "\xF8vre-eiker": _3, "oyer": _3, "xn--yer-zna": _3, "\xF8yer": _3, "oygarden": _3, "xn--ygarden-p1a": _3, "\xF8ygarden": _3, "oystre-slidre": _3, "xn--ystre-slidre-ujb": _3, "\xF8ystre-slidre": _3, "porsanger": _3, "porsangu": _3, "xn--porsgu-sta26f": _3, "pors\xE1\u014Bgu": _3, "porsgrunn": _3, "rade": _3, "xn--rde-ula": _3, "r\xE5de": _3, "radoy": _3, "xn--rady-ira": _3, "rad\xF8y": _3, "xn--rlingen-mxa": _3, "r\xE6lingen": _3, "rahkkeravju": _3, "xn--rhkkervju-01af": _3, "r\xE1hkker\xE1vju": _3, "raisa": _3, "xn--risa-5na": _3, "r\xE1isa": _3, "rakkestad": _3, "ralingen": _3, "rana": _3, "randaberg": _3, "rauma": _3, "rendalen": _3, "rennebu": _3, "rennesoy": _3, "xn--rennesy-v1a": _3, "rennes\xF8y": _3, "rindal": _3, "ringebu": _3, "ringerike": _3, "ringsaker": _3, "risor": _3, "xn--risr-ira": _3, "ris\xF8r": _3, "rissa": _3, "roan": _3, "rodoy": _3, "xn--rdy-0nab": _3, "r\xF8d\xF8y": _3, "rollag": _3, "romsa": _3, "romskog": _3, "xn--rmskog-bya": _3, "r\xF8mskog": _3, "roros": _3, "xn--rros-gra": _3, "r\xF8ros": _3, "rost": _3, "xn--rst-0na": _3, "r\xF8st": _3, "royken": _3, "xn--ryken-vua": _3, "r\xF8yken": _3, "royrvik": _3, "xn--ryrvik-bya": _3, "r\xF8yrvik": _3, "ruovat": _3, "rygge": _3, "salangen": _3, "salat": _3, "xn--slat-5na": _3, "s\xE1lat": _3, "xn--slt-elab": _3, "s\xE1l\xE1t": _3, "saltdal": _3, "samnanger": _3, "sandefjord": _3, "sandnes": _3, "sandoy": _3, "xn--sandy-yua": _3, "sand\xF8y": _3, "sarpsborg": _3, "sauda": _3, "sauherad": _3, "sel": _3, "selbu": _3, "selje": _3, "seljord": _3, "siellak": _3, "sigdal": _3, "siljan": _3, "sirdal": _3, "skanit": _3, "xn--sknit-yqa": _3, "sk\xE1nit": _3, "skanland": _3, "xn--sknland-fxa": _3, "sk\xE5nland": _3, "skaun": _3, "skedsmo": _3, "ski": _3, "skien": _3, "skierva": _3, "xn--skierv-uta": _3, "skierv\xE1": _3, "skiptvet": _3, "skjak": _3, "xn--skjk-soa": _3, "skj\xE5k": _3, "skjervoy": _3, "xn--skjervy-v1a": _3, "skjerv\xF8y": _3, "skodje": _3, "smola": _3, "xn--smla-hra": _3, "sm\xF8la": _3, "snaase": _3, "xn--snase-nra": _3, "sn\xE5ase": _3, "snasa": _3, "xn--snsa-roa": _3, "sn\xE5sa": _3, "snillfjord": _3, "snoasa": _3, "sogndal": _3, "sogne": _3, "xn--sgne-gra": _3, "s\xF8gne": _3, "sokndal": _3, "sola": _3, "solund": _3, "somna": _3, "xn--smna-gra": _3, "s\xF8mna": _3, "sondre-land": _3, "xn--sndre-land-0cb": _3, "s\xF8ndre-land": _3, "songdalen": _3, "sor-aurdal": _3, "xn--sr-aurdal-l8a": _3, "s\xF8r-aurdal": _3, "sor-fron": _3, "xn--sr-fron-q1a": _3, "s\xF8r-fron": _3, "sor-odal": _3, "xn--sr-odal-q1a": _3, "s\xF8r-odal": _3, "sor-varanger": _3, "xn--sr-varanger-ggb": _3, "s\xF8r-varanger": _3, "sorfold": _3, "xn--srfold-bya": _3, "s\xF8rfold": _3, "sorreisa": _3, "xn--srreisa-q1a": _3, "s\xF8rreisa": _3, "sortland": _3, "sorum": _3, "xn--srum-gra": _3, "s\xF8rum": _3, "spydeberg": _3, "stange": _3, "stavanger": _3, "steigen": _3, "steinkjer": _3, "stjordal": _3, "xn--stjrdal-s1a": _3, "stj\xF8rdal": _3, "stokke": _3, "stor-elvdal": _3, "stord": _3, "stordal": _3, "storfjord": _3, "strand": _3, "stranda": _3, "stryn": _3, "sula": _3, "suldal": _3, "sund": _3, "sunndal": _3, "surnadal": _3, "sveio": _3, "svelvik": _3, "sykkylven": _3, "tana": _3, "telemark": [0, { "bo": _3, "xn--b-5ga": _3, "b\xF8": _3 }], "time": _3, "tingvoll": _3, "tinn": _3, "tjeldsund": _3, "tjome": _3, "xn--tjme-hra": _3, "tj\xF8me": _3, "tokke": _3, "tolga": _3, "tonsberg": _3, "xn--tnsberg-q1a": _3, "t\xF8nsberg": _3, "torsken": _3, "xn--trna-woa": _3, "tr\xE6na": _3, "trana": _3, "tranoy": _3, "xn--trany-yua": _3, "tran\xF8y": _3, "troandin": _3, "trogstad": _3, "xn--trgstad-r1a": _3, "tr\xF8gstad": _3, "tromsa": _3, "tromso": _3, "xn--troms-zua": _3, "troms\xF8": _3, "trondheim": _3, "trysil": _3, "tvedestrand": _3, "tydal": _3, "tynset": _3, "tysfjord": _3, "tysnes": _3, "xn--tysvr-vra": _3, "tysv\xE6r": _3, "tysvar": _3, "ullensaker": _3, "ullensvang": _3, "ulvik": _3, "unjarga": _3, "xn--unjrga-rta": _3, "unj\xE1rga": _3, "utsira": _3, "vaapste": _3, "vadso": _3, "xn--vads-jra": _3, "vads\xF8": _3, "xn--vry-yla5g": _3, "v\xE6r\xF8y": _3, "vaga": _3, "xn--vg-yiab": _3, "v\xE5g\xE5": _3, "vagan": _3, "xn--vgan-qoa": _3, "v\xE5gan": _3, "vagsoy": _3, "xn--vgsy-qoa0j": _3, "v\xE5gs\xF8y": _3, "vaksdal": _3, "valle": _3, "vang": _3, "vanylven": _3, "vardo": _3, "xn--vard-jra": _3, "vard\xF8": _3, "varggat": _3, "xn--vrggt-xqad": _3, "v\xE1rgg\xE1t": _3, "varoy": _3, "vefsn": _3, "vega": _3, "vegarshei": _3, "xn--vegrshei-c0a": _3, "veg\xE5rshei": _3, "vennesla": _3, "verdal": _3, "verran": _3, "vestby": _3, "vestfold": [0, { "sande": _3 }], "vestnes": _3, "vestre-slidre": _3, "vestre-toten": _3, "vestvagoy": _3, "xn--vestvgy-ixa6o": _3, "vestv\xE5g\xF8y": _3, "vevelstad": _3, "vik": _3, "vikna": _3, "vindafjord": _3, "voagat": _3, "volda": _3, "voss": _3, "co": _4, "123hjemmeside": _4, "myspreadshop": _4 }], "np": _18, "nr": _56, "nu": [1, { "merseine": _4, "mine": _4, "shacknet": _4, "enterprisecloud": _4 }], "nz": [1, { "ac": _3, "co": _3, "cri": _3, "geek": _3, "gen": _3, "govt": _3, "health": _3, "iwi": _3, "kiwi": _3, "maori": _3, "xn--mori-qsa": _3, "m\u0101ori": _3, "mil": _3, "net": _3, "org": _3, "parliament": _3, "school": _3, "cloudns": _4 }], "om": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "med": _3, "museum": _3, "net": _3, "org": _3, "pro": _3 }], "onion": _3, "org": [1, { "altervista": _4, "pimienta": _4, "poivron": _4, "potager": _4, "sweetpepper": _4, "cdn77": [0, { "c": _4, "rsc": _4 }], "cdn77-secure": [0, { "origin": [0, { "ssl": _4 }] }], "ae": _4, "cloudns": _4, "ip-dynamic": _4, "ddnss": _4, "dpdns": _4, "duckdns": _4, "tunk": _4, "blogdns": _4, "blogsite": _4, "boldlygoingnowhere": _4, "dnsalias": _4, "dnsdojo": _4, "doesntexist": _4, "dontexist": _4, "doomdns": _4, "dvrdns": _4, "dynalias": _4, "dyndns": [2, { "go": _4, "home": _4 }], "endofinternet": _4, "endoftheinternet": _4, "from-me": _4, "game-host": _4, "gotdns": _4, "hobby-site": _4, "homedns": _4, "homeftp": _4, "homelinux": _4, "homeunix": _4, "is-a-bruinsfan": _4, "is-a-candidate": _4, "is-a-celticsfan": _4, "is-a-chef": _4, "is-a-geek": _4, "is-a-knight": _4, "is-a-linux-user": _4, "is-a-patsfan": _4, "is-a-soxfan": _4, "is-found": _4, "is-lost": _4, "is-saved": _4, "is-very-bad": _4, "is-very-evil": _4, "is-very-good": _4, "is-very-nice": _4, "is-very-sweet": _4, "isa-geek": _4, "kicks-ass": _4, "misconfused": _4, "podzone": _4, "readmyblog": _4, "selfip": _4, "sellsyourhome": _4, "servebbs": _4, "serveftp": _4, "servegame": _4, "stuff-4-sale": _4, "webhop": _4, "accesscam": _4, "camdvr": _4, "freeddns": _4, "mywire": _4, "webredirect": _4, "twmail": _4, "eu": [2, { "al": _4, "asso": _4, "at": _4, "au": _4, "be": _4, "bg": _4, "ca": _4, "cd": _4, "ch": _4, "cn": _4, "cy": _4, "cz": _4, "de": _4, "dk": _4, "edu": _4, "ee": _4, "es": _4, "fi": _4, "fr": _4, "gr": _4, "hr": _4, "hu": _4, "ie": _4, "il": _4, "in": _4, "int": _4, "is": _4, "it": _4, "jp": _4, "kr": _4, "lt": _4, "lu": _4, "lv": _4, "me": _4, "mk": _4, "mt": _4, "my": _4, "net": _4, "ng": _4, "nl": _4, "no": _4, "nz": _4, "pl": _4, "pt": _4, "ro": _4, "ru": _4, "se": _4, "si": _4, "sk": _4, "tr": _4, "uk": _4, "us": _4 }], "fedorainfracloud": _4, "fedorapeople": _4, "fedoraproject": [0, { "cloud": _4, "os": _43, "stg": [0, { "os": _43 }] }], "freedesktop": _4, "hatenadiary": _4, "hepforge": _4, "in-dsl": _4, "in-vpn": _4, "js": _4, "barsy": _4, "mayfirst": _4, "routingthecloud": _4, "bmoattachments": _4, "cable-modem": _4, "collegefan": _4, "couchpotatofries": _4, "hopto": _4, "mlbfan": _4, "myftp": _4, "mysecuritycamera": _4, "nflfan": _4, "no-ip": _4, "read-books": _4, "ufcfan": _4, "zapto": _4, "dynserv": _4, "now-dns": _4, "is-local": _4, "httpbin": _4, "pubtls": _4, "jpn": _4, "my-firewall": _4, "myfirewall": _4, "spdns": _4, "small-web": _4, "dsmynas": _4, "familyds": _4, "teckids": _55, "tuxfamily": _4, "diskstation": _4, "hk": _4, "us": _4, "toolforge": _4, "wmcloud": _4, "wmflabs": _4, "za": _4 }], "pa": [1, { "abo": _3, "ac": _3, "com": _3, "edu": _3, "gob": _3, "ing": _3, "med": _3, "net": _3, "nom": _3, "org": _3, "sld": _3 }], "pe": [1, { "com": _3, "edu": _3, "gob": _3, "mil": _3, "net": _3, "nom": _3, "org": _3 }], "pf": [1, { "com": _3, "edu": _3, "org": _3 }], "pg": _18, "ph": [1, { "com": _3, "edu": _3, "gov": _3, "i": _3, "mil": _3, "net": _3, "ngo": _3, "org": _3, "cloudns": _4 }], "pk": [1, { "ac": _3, "biz": _3, "com": _3, "edu": _3, "fam": _3, "gkp": _3, "gob": _3, "gog": _3, "gok": _3, "gop": _3, "gos": _3, "gov": _3, "net": _3, "org": _3, "web": _3 }], "pl": [1, { "com": _3, "net": _3, "org": _3, "agro": _3, "aid": _3, "atm": _3, "auto": _3, "biz": _3, "edu": _3, "gmina": _3, "gsm": _3, "info": _3, "mail": _3, "media": _3, "miasta": _3, "mil": _3, "nieruchomosci": _3, "nom": _3, "pc": _3, "powiat": _3, "priv": _3, "realestate": _3, "rel": _3, "sex": _3, "shop": _3, "sklep": _3, "sos": _3, "szkola": _3, "targi": _3, "tm": _3, "tourism": _3, "travel": _3, "turystyka": _3, "gov": [1, { "ap": _3, "griw": _3, "ic": _3, "is": _3, "kmpsp": _3, "konsulat": _3, "kppsp": _3, "kwp": _3, "kwpsp": _3, "mup": _3, "mw": _3, "oia": _3, "oirm": _3, "oke": _3, "oow": _3, "oschr": _3, "oum": _3, "pa": _3, "pinb": _3, "piw": _3, "po": _3, "pr": _3, "psp": _3, "psse": _3, "pup": _3, "rzgw": _3, "sa": _3, "sdn": _3, "sko": _3, "so": _3, "sr": _3, "starostwo": _3, "ug": _3, "ugim": _3, "um": _3, "umig": _3, "upow": _3, "uppo": _3, "us": _3, "uw": _3, "uzs": _3, "wif": _3, "wiih": _3, "winb": _3, "wios": _3, "witd": _3, "wiw": _3, "wkz": _3, "wsa": _3, "wskr": _3, "wsse": _3, "wuoz": _3, "wzmiuw": _3, "zp": _3, "zpisdn": _3 }], "augustow": _3, "babia-gora": _3, "bedzin": _3, "beskidy": _3, "bialowieza": _3, "bialystok": _3, "bielawa": _3, "bieszczady": _3, "boleslawiec": _3, "bydgoszcz": _3, "bytom": _3, "cieszyn": _3, "czeladz": _3, "czest": _3, "dlugoleka": _3, "elblag": _3, "elk": _3, "glogow": _3, "gniezno": _3, "gorlice": _3, "grajewo": _3, "ilawa": _3, "jaworzno": _3, "jelenia-gora": _3, "jgora": _3, "kalisz": _3, "karpacz": _3, "kartuzy": _3, "kaszuby": _3, "katowice": _3, "kazimierz-dolny": _3, "kepno": _3, "ketrzyn": _3, "klodzko": _3, "kobierzyce": _3, "kolobrzeg": _3, "konin": _3, "konskowola": _3, "kutno": _3, "lapy": _3, "lebork": _3, "legnica": _3, "lezajsk": _3, "limanowa": _3, "lomza": _3, "lowicz": _3, "lubin": _3, "lukow": _3, "malbork": _3, "malopolska": _3, "mazowsze": _3, "mazury": _3, "mielec": _3, "mielno": _3, "mragowo": _3, "naklo": _3, "nowaruda": _3, "nysa": _3, "olawa": _3, "olecko": _3, "olkusz": _3, "olsztyn": _3, "opoczno": _3, "opole": _3, "ostroda": _3, "ostroleka": _3, "ostrowiec": _3, "ostrowwlkp": _3, "pila": _3, "pisz": _3, "podhale": _3, "podlasie": _3, "polkowice": _3, "pomorskie": _3, "pomorze": _3, "prochowice": _3, "pruszkow": _3, "przeworsk": _3, "pulawy": _3, "radom": _3, "rawa-maz": _3, "rybnik": _3, "rzeszow": _3, "sanok": _3, "sejny": _3, "skoczow": _3, "slask": _3, "slupsk": _3, "sosnowiec": _3, "stalowa-wola": _3, "starachowice": _3, "stargard": _3, "suwalki": _3, "swidnica": _3, "swiebodzin": _3, "swinoujscie": _3, "szczecin": _3, "szczytno": _3, "tarnobrzeg": _3, "tgory": _3, "turek": _3, "tychy": _3, "ustka": _3, "walbrzych": _3, "warmia": _3, "warszawa": _3, "waw": _3, "wegrow": _3, "wielun": _3, "wlocl": _3, "wloclawek": _3, "wodzislaw": _3, "wolomin": _3, "wroclaw": _3, "zachpomor": _3, "zagan": _3, "zarow": _3, "zgora": _3, "zgorzelec": _3, "art": _4, "gliwice": _4, "krakow": _4, "poznan": _4, "wroc": _4, "zakopane": _4, "beep": _4, "ecommerce-shop": _4, "cfolks": _4, "dfirma": _4, "dkonto": _4, "you2": _4, "shoparena": _4, "homesklep": _4, "sdscloud": _4, "unicloud": _4, "lodz": _4, "pabianice": _4, "plock": _4, "sieradz": _4, "skierniewice": _4, "zgierz": _4, "krasnik": _4, "leczna": _4, "lubartow": _4, "lublin": _4, "poniatowa": _4, "swidnik": _4, "co": _4, "torun": _4, "simplesite": _4, "myspreadshop": _4, "gda": _4, "gdansk": _4, "gdynia": _4, "med": _4, "sopot": _4, "bielsko": _4 }], "pm": [1, { "own": _4, "name": _4 }], "pn": [1, { "co": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], "post": _3, "pr": [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "isla": _3, "name": _3, "net": _3, "org": _3, "pro": _3, "ac": _3, "est": _3, "prof": _3 }], "pro": [1, { "aaa": _3, "aca": _3, "acct": _3, "avocat": _3, "bar": _3, "cpa": _3, "eng": _3, "jur": _3, "law": _3, "med": _3, "recht": _3, "12chars": _4, "cloudns": _4, "barsy": _4, "ngrok": _4 }], "ps": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "plo": _3, "sec": _3 }], "pt": [1, { "com": _3, "edu": _3, "gov": _3, "int": _3, "net": _3, "nome": _3, "org": _3, "publ": _3, "123paginaweb": _4 }], "pw": [1, { "gov": _3, "cloudns": _4, "x443": _4 }], "py": [1, { "com": _3, "coop": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], "qa": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "sch": _3 }], "re": [1, { "asso": _3, "com": _3, "netlib": _4, "can": _4 }], "ro": [1, { "arts": _3, "com": _3, "firm": _3, "info": _3, "nom": _3, "nt": _3, "org": _3, "rec": _3, "store": _3, "tm": _3, "www": _3, "co": _4, "shop": _4, "barsy": _4 }], "rs": [1, { "ac": _3, "co": _3, "edu": _3, "gov": _3, "in": _3, "org": _3, "brendly": _51, "barsy": _4, "ox": _4 }], "ru": [1, { "ac": _4, "edu": _4, "gov": _4, "int": _4, "mil": _4, "eurodir": _4, "adygeya": _4, "bashkiria": _4, "bir": _4, "cbg": _4, "com": _4, "dagestan": _4, "grozny": _4, "kalmykia": _4, "kustanai": _4, "marine": _4, "mordovia": _4, "msk": _4, "mytis": _4, "nalchik": _4, "nov": _4, "pyatigorsk": _4, "spb": _4, "vladikavkaz": _4, "vladimir": _4, "na4u": _4, "mircloud": _4, "myjino": [2, { "hosting": _7, "landing": _7, "spectrum": _7, "vps": _7 }], "cldmail": [0, { "hb": _4 }], "mcdir": [2, { "vps": _4 }], "mcpre": _4, "net": _4, "org": _4, "pp": _4, "lk3": _4, "ras": _4 }], "rw": [1, { "ac": _3, "co": _3, "coop": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], "sa": [1, { "com": _3, "edu": _3, "gov": _3, "med": _3, "net": _3, "org": _3, "pub": _3, "sch": _3 }], "sb": _5, "sc": _5, "sd": [1, { "com": _3, "edu": _3, "gov": _3, "info": _3, "med": _3, "net": _3, "org": _3, "tv": _3 }], "se": [1, { "a": _3, "ac": _3, "b": _3, "bd": _3, "brand": _3, "c": _3, "d": _3, "e": _3, "f": _3, "fh": _3, "fhsk": _3, "fhv": _3, "g": _3, "h": _3, "i": _3, "k": _3, "komforb": _3, "kommunalforbund": _3, "komvux": _3, "l": _3, "lanbib": _3, "m": _3, "n": _3, "naturbruksgymn": _3, "o": _3, "org": _3, "p": _3, "parti": _3, "pp": _3, "press": _3, "r": _3, "s": _3, "t": _3, "tm": _3, "u": _3, "w": _3, "x": _3, "y": _3, "z": _3, "com": _4, "iopsys": _4, "123minsida": _4, "itcouldbewor": _4, "myspreadshop": _4 }], "sg": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "enscaled": _4 }], "sh": [1, { "com": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "hashbang": _4, "botda": _4, "platform": [0, { "ent": _4, "eu": _4, "us": _4 }], "now": _4 }], "si": [1, { "f5": _4, "gitapp": _4, "gitpage": _4 }], "sj": _3, "sk": _3, "sl": _5, "sm": _3, "sn": [1, { "art": _3, "com": _3, "edu": _3, "gouv": _3, "org": _3, "perso": _3, "univ": _3 }], "so": [1, { "com": _3, "edu": _3, "gov": _3, "me": _3, "net": _3, "org": _3, "surveys": _4 }], "sr": _3, "ss": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "me": _3, "net": _3, "org": _3, "sch": _3 }], "st": [1, { "co": _3, "com": _3, "consulado": _3, "edu": _3, "embaixada": _3, "mil": _3, "net": _3, "org": _3, "principe": _3, "saotome": _3, "store": _3, "helioho": _4, "kirara": _4, "noho": _4 }], "su": [1, { "abkhazia": _4, "adygeya": _4, "aktyubinsk": _4, "arkhangelsk": _4, "armenia": _4, "ashgabad": _4, "azerbaijan": _4, "balashov": _4, "bashkiria": _4, "bryansk": _4, "bukhara": _4, "chimkent": _4, "dagestan": _4, "east-kazakhstan": _4, "exnet": _4, "georgia": _4, "grozny": _4, "ivanovo": _4, "jambyl": _4, "kalmykia": _4, "kaluga": _4, "karacol": _4, "karaganda": _4, "karelia": _4, "khakassia": _4, "krasnodar": _4, "kurgan": _4, "kustanai": _4, "lenug": _4, "mangyshlak": _4, "mordovia": _4, "msk": _4, "murmansk": _4, "nalchik": _4, "navoi": _4, "north-kazakhstan": _4, "nov": _4, "obninsk": _4, "penza": _4, "pokrovsk": _4, "sochi": _4, "spb": _4, "tashkent": _4, "termez": _4, "togliatti": _4, "troitsk": _4, "tselinograd": _4, "tula": _4, "tuva": _4, "vladikavkaz": _4, "vladimir": _4, "vologda": _4 }], "sv": [1, { "com": _3, "edu": _3, "gob": _3, "org": _3, "red": _3 }], "sx": _11, "sy": _6, "sz": [1, { "ac": _3, "co": _3, "org": _3 }], "tc": _3, "td": _3, "tel": _3, "tf": [1, { "sch": _4 }], "tg": _3, "th": [1, { "ac": _3, "co": _3, "go": _3, "in": _3, "mi": _3, "net": _3, "or": _3, "online": _4, "shop": _4 }], "tj": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "edu": _3, "go": _3, "gov": _3, "int": _3, "mil": _3, "name": _3, "net": _3, "nic": _3, "org": _3, "test": _3, "web": _3 }], "tk": _3, "tl": _11, "tm": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "nom": _3, "org": _3 }], "tn": [1, { "com": _3, "ens": _3, "fin": _3, "gov": _3, "ind": _3, "info": _3, "intl": _3, "mincom": _3, "nat": _3, "net": _3, "org": _3, "perso": _3, "tourism": _3, "orangecloud": _4 }], "to": [1, { "611": _4, "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "oya": _4, "x0": _4, "quickconnect": _25, "vpnplus": _4 }], "tr": [1, { "av": _3, "bbs": _3, "bel": _3, "biz": _3, "com": _3, "dr": _3, "edu": _3, "gen": _3, "gov": _3, "info": _3, "k12": _3, "kep": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pol": _3, "tel": _3, "tsk": _3, "tv": _3, "web": _3, "nc": _11 }], "tt": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pro": _3 }], "tv": [1, { "better-than": _4, "dyndns": _4, "on-the-web": _4, "worse-than": _4, "from": _4, "sakura": _4 }], "tw": [1, { "club": _3, "com": [1, { "mymailer": _4 }], "ebiz": _3, "edu": _3, "game": _3, "gov": _3, "idv": _3, "mil": _3, "net": _3, "org": _3, "url": _4, "mydns": _4 }], "tz": [1, { "ac": _3, "co": _3, "go": _3, "hotel": _3, "info": _3, "me": _3, "mil": _3, "mobi": _3, "ne": _3, "or": _3, "sc": _3, "tv": _3 }], "ua": [1, { "com": _3, "edu": _3, "gov": _3, "in": _3, "net": _3, "org": _3, "cherkassy": _3, "cherkasy": _3, "chernigov": _3, "chernihiv": _3, "chernivtsi": _3, "chernovtsy": _3, "ck": _3, "cn": _3, "cr": _3, "crimea": _3, "cv": _3, "dn": _3, "dnepropetrovsk": _3, "dnipropetrovsk": _3, "donetsk": _3, "dp": _3, "if": _3, "ivano-frankivsk": _3, "kh": _3, "kharkiv": _3, "kharkov": _3, "kherson": _3, "khmelnitskiy": _3, "khmelnytskyi": _3, "kiev": _3, "kirovograd": _3, "km": _3, "kr": _3, "kropyvnytskyi": _3, "krym": _3, "ks": _3, "kv": _3, "kyiv": _3, "lg": _3, "lt": _3, "lugansk": _3, "luhansk": _3, "lutsk": _3, "lv": _3, "lviv": _3, "mk": _3, "mykolaiv": _3, "nikolaev": _3, "od": _3, "odesa": _3, "odessa": _3, "pl": _3, "poltava": _3, "rivne": _3, "rovno": _3, "rv": _3, "sb": _3, "sebastopol": _3, "sevastopol": _3, "sm": _3, "sumy": _3, "te": _3, "ternopil": _3, "uz": _3, "uzhgorod": _3, "uzhhorod": _3, "vinnica": _3, "vinnytsia": _3, "vn": _3, "volyn": _3, "yalta": _3, "zakarpattia": _3, "zaporizhzhe": _3, "zaporizhzhia": _3, "zhitomir": _3, "zhytomyr": _3, "zp": _3, "zt": _3, "cc": _4, "inf": _4, "ltd": _4, "cx": _4, "ie": _4, "biz": _4, "co": _4, "pp": _4, "v": _4 }], "ug": [1, { "ac": _3, "co": _3, "com": _3, "edu": _3, "go": _3, "gov": _3, "mil": _3, "ne": _3, "or": _3, "org": _3, "sc": _3, "us": _3 }], "uk": [1, { "ac": _3, "co": [1, { "bytemark": [0, { "dh": _4, "vm": _4 }], "layershift": _46, "barsy": _4, "barsyonline": _4, "retrosnub": _54, "nh-serv": _4, "no-ip": _4, "adimo": _4, "myspreadshop": _4 }], "gov": [1, { "api": _4, "campaign": _4, "service": _4 }], "ltd": _3, "me": _3, "net": _3, "nhs": _3, "org": [1, { "glug": _4, "lug": _4, "lugs": _4, "affinitylottery": _4, "raffleentry": _4, "weeklylottery": _4 }], "plc": _3, "police": _3, "sch": _18, "conn": _4, "copro": _4, "hosp": _4, "independent-commission": _4, "independent-inquest": _4, "independent-inquiry": _4, "independent-panel": _4, "independent-review": _4, "public-inquiry": _4, "royal-commission": _4, "pymnt": _4, "barsy": _4, "nimsite": _4, "oraclegovcloudapps": _7 }], "us": [1, { "dni": _3, "isa": _3, "nsn": _3, "ak": _62, "al": _62, "ar": _62, "as": _62, "az": _62, "ca": _62, "co": _62, "ct": _62, "dc": _62, "de": [1, { "cc": _3, "lib": _4 }], "fl": _62, "ga": _62, "gu": _62, "hi": _63, "ia": _62, "id": _62, "il": _62, "in": _62, "ks": _62, "ky": _62, "la": _62, "ma": [1, { "k12": [1, { "chtr": _3, "paroch": _3, "pvt": _3 }], "cc": _3, "lib": _3 }], "md": _62, "me": _62, "mi": [1, { "k12": _3, "cc": _3, "lib": _3, "ann-arbor": _3, "cog": _3, "dst": _3, "eaton": _3, "gen": _3, "mus": _3, "tec": _3, "washtenaw": _3 }], "mn": _62, "mo": _62, "ms": _62, "mt": _62, "nc": _62, "nd": _63, "ne": _62, "nh": _62, "nj": _62, "nm": _62, "nv": _62, "ny": _62, "oh": _62, "ok": _62, "or": _62, "pa": _62, "pr": _62, "ri": _63, "sc": _62, "sd": _63, "tn": _62, "tx": _62, "ut": _62, "va": _62, "vi": _62, "vt": _62, "wa": _62, "wi": _62, "wv": [1, { "cc": _3 }], "wy": _62, "cloudns": _4, "is-by": _4, "land-4-sale": _4, "stuff-4-sale": _4, "heliohost": _4, "enscaled": [0, { "phx": _4 }], "mircloud": _4, "ngo": _4, "golffan": _4, "noip": _4, "pointto": _4, "freeddns": _4, "srv": [2, { "gh": _4, "gl": _4 }], "platterp": _4, "servername": _4 }], "uy": [1, { "com": _3, "edu": _3, "gub": _3, "mil": _3, "net": _3, "org": _3 }], "uz": [1, { "co": _3, "com": _3, "net": _3, "org": _3 }], "va": _3, "vc": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "gv": [2, { "d": _4 }], "0e": _7, "mydns": _4 }], "ve": [1, { "arts": _3, "bib": _3, "co": _3, "com": _3, "e12": _3, "edu": _3, "emprende": _3, "firm": _3, "gob": _3, "gov": _3, "info": _3, "int": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "rar": _3, "rec": _3, "store": _3, "tec": _3, "web": _3 }], "vg": [1, { "edu": _3 }], "vi": [1, { "co": _3, "com": _3, "k12": _3, "net": _3, "org": _3 }], "vn": [1, { "ac": _3, "ai": _3, "biz": _3, "com": _3, "edu": _3, "gov": _3, "health": _3, "id": _3, "info": _3, "int": _3, "io": _3, "name": _3, "net": _3, "org": _3, "pro": _3, "angiang": _3, "bacgiang": _3, "backan": _3, "baclieu": _3, "bacninh": _3, "baria-vungtau": _3, "bentre": _3, "binhdinh": _3, "binhduong": _3, "binhphuoc": _3, "binhthuan": _3, "camau": _3, "cantho": _3, "caobang": _3, "daklak": _3, "daknong": _3, "danang": _3, "dienbien": _3, "dongnai": _3, "dongthap": _3, "gialai": _3, "hagiang": _3, "haiduong": _3, "haiphong": _3, "hanam": _3, "hanoi": _3, "hatinh": _3, "haugiang": _3, "hoabinh": _3, "hungyen": _3, "khanhhoa": _3, "kiengiang": _3, "kontum": _3, "laichau": _3, "lamdong": _3, "langson": _3, "laocai": _3, "longan": _3, "namdinh": _3, "nghean": _3, "ninhbinh": _3, "ninhthuan": _3, "phutho": _3, "phuyen": _3, "quangbinh": _3, "quangnam": _3, "quangngai": _3, "quangninh": _3, "quangtri": _3, "soctrang": _3, "sonla": _3, "tayninh": _3, "thaibinh": _3, "thainguyen": _3, "thanhhoa": _3, "thanhphohochiminh": _3, "thuathienhue": _3, "tiengiang": _3, "travinh": _3, "tuyenquang": _3, "vinhlong": _3, "vinhphuc": _3, "yenbai": _3 }], "vu": _45, "wf": [1, { "biz": _4, "sch": _4 }], "ws": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "advisor": _7, "cloud66": _4, "dyndns": _4, "mypets": _4 }], "yt": [1, { "org": _4 }], "xn--mgbaam7a8h": _3, "\u0627\u0645\u0627\u0631\u0627\u062A": _3, "xn--y9a3aq": _3, "\u0570\u0561\u0575": _3, "xn--54b7fta0cc": _3, "\u09AC\u09BE\u0982\u09B2\u09BE": _3, "xn--90ae": _3, "\u0431\u0433": _3, "xn--mgbcpq6gpa1a": _3, "\u0627\u0644\u0628\u062D\u0631\u064A\u0646": _3, "xn--90ais": _3, "\u0431\u0435\u043B": _3, "xn--fiqs8s": _3, "\u4E2D\u56FD": _3, "xn--fiqz9s": _3, "\u4E2D\u570B": _3, "xn--lgbbat1ad8j": _3, "\u0627\u0644\u062C\u0632\u0627\u0626\u0631": _3, "xn--wgbh1c": _3, "\u0645\u0635\u0631": _3, "xn--e1a4c": _3, "\u0435\u044E": _3, "xn--qxa6a": _3, "\u03B5\u03C5": _3, "xn--mgbah1a3hjkrd": _3, "\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627": _3, "xn--node": _3, "\u10D2\u10D4": _3, "xn--qxam": _3, "\u03B5\u03BB": _3, "xn--j6w193g": [1, { "xn--gmqw5a": _3, "xn--55qx5d": _3, "xn--mxtq1m": _3, "xn--wcvs22d": _3, "xn--uc0atv": _3, "xn--od0alg": _3 }], "\u9999\u6E2F": [1, { "\u500B\u4EBA": _3, "\u516C\u53F8": _3, "\u653F\u5E9C": _3, "\u6559\u80B2": _3, "\u7D44\u7E54": _3, "\u7DB2\u7D61": _3 }], "xn--2scrj9c": _3, "\u0CAD\u0CBE\u0CB0\u0CA4": _3, "xn--3hcrj9c": _3, "\u0B2D\u0B3E\u0B30\u0B24": _3, "xn--45br5cyl": _3, "\u09AD\u09BE\u09F0\u09A4": _3, "xn--h2breg3eve": _3, "\u092D\u093E\u0930\u0924\u092E\u094D": _3, "xn--h2brj9c8c": _3, "\u092D\u093E\u0930\u094B\u0924": _3, "xn--mgbgu82a": _3, "\u0680\u0627\u0631\u062A": _3, "xn--rvc1e0am3e": _3, "\u0D2D\u0D3E\u0D30\u0D24\u0D02": _3, "xn--h2brj9c": _3, "\u092D\u093E\u0930\u0924": _3, "xn--mgbbh1a": _3, "\u0628\u0627\u0631\u062A": _3, "xn--mgbbh1a71e": _3, "\u0628\u06BE\u0627\u0631\u062A": _3, "xn--fpcrj9c3d": _3, "\u0C2D\u0C3E\u0C30\u0C24\u0C4D": _3, "xn--gecrj9c": _3, "\u0AAD\u0ABE\u0AB0\u0AA4": _3, "xn--s9brj9c": _3, "\u0A2D\u0A3E\u0A30\u0A24": _3, "xn--45brj9c": _3, "\u09AD\u09BE\u09B0\u09A4": _3, "xn--xkc2dl3a5ee0h": _3, "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE": _3, "xn--mgba3a4f16a": _3, "\u0627\u06CC\u0631\u0627\u0646": _3, "xn--mgba3a4fra": _3, "\u0627\u064A\u0631\u0627\u0646": _3, "xn--mgbtx2b": _3, "\u0639\u0631\u0627\u0642": _3, "xn--mgbayh7gpa": _3, "\u0627\u0644\u0627\u0631\u062F\u0646": _3, "xn--3e0b707e": _3, "\uD55C\uAD6D": _3, "xn--80ao21a": _3, "\u049B\u0430\u0437": _3, "xn--q7ce6a": _3, "\u0EA5\u0EB2\u0EA7": _3, "xn--fzc2c9e2c": _3, "\u0DBD\u0D82\u0D9A\u0DCF": _3, "xn--xkc2al3hye2a": _3, "\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8": _3, "xn--mgbc0a9azcg": _3, "\u0627\u0644\u0645\u063A\u0631\u0628": _3, "xn--d1alf": _3, "\u043C\u043A\u0434": _3, "xn--l1acc": _3, "\u043C\u043E\u043D": _3, "xn--mix891f": _3, "\u6FB3\u9580": _3, "xn--mix082f": _3, "\u6FB3\u95E8": _3, "xn--mgbx4cd0ab": _3, "\u0645\u0644\u064A\u0633\u064A\u0627": _3, "xn--mgb9awbf": _3, "\u0639\u0645\u0627\u0646": _3, "xn--mgbai9azgqp6j": _3, "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646": _3, "xn--mgbai9a5eva00b": _3, "\u067E\u0627\u0643\u0633\u062A\u0627\u0646": _3, "xn--ygbi2ammx": _3, "\u0641\u0644\u0633\u0637\u064A\u0646": _3, "xn--90a3ac": [1, { "xn--80au": _3, "xn--90azh": _3, "xn--d1at": _3, "xn--c1avg": _3, "xn--o1ac": _3, "xn--o1ach": _3 }], "\u0441\u0440\u0431": [1, { "\u0430\u043A": _3, "\u043E\u0431\u0440": _3, "\u043E\u0434": _3, "\u043E\u0440\u0433": _3, "\u043F\u0440": _3, "\u0443\u043F\u0440": _3 }], "xn--p1ai": _3, "\u0440\u0444": _3, "xn--wgbl6a": _3, "\u0642\u0637\u0631": _3, "xn--mgberp4a5d4ar": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629": _3, "xn--mgberp4a5d4a87g": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u0629": _3, "xn--mgbqly7c0a67fbc": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u06C3": _3, "xn--mgbqly7cvafr": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0647": _3, "xn--mgbpl2fh": _3, "\u0633\u0648\u062F\u0627\u0646": _3, "xn--yfro4i67o": _3, "\u65B0\u52A0\u5761": _3, "xn--clchc0ea0b2g2a9gcd": _3, "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD": _3, "xn--ogbpf8fl": _3, "\u0633\u0648\u0631\u064A\u0629": _3, "xn--mgbtf8fl": _3, "\u0633\u0648\u0631\u064A\u0627": _3, "xn--o3cw4h": [1, { "xn--o3cyx2a": _3, "xn--12co0c3b4eva": _3, "xn--m3ch0j3a": _3, "xn--h3cuzk1di": _3, "xn--12c1fe0br": _3, "xn--12cfi8ixb8l": _3 }], "\u0E44\u0E17\u0E22": [1, { "\u0E17\u0E2B\u0E32\u0E23": _3, "\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08": _3, "\u0E40\u0E19\u0E47\u0E15": _3, "\u0E23\u0E31\u0E10\u0E1A\u0E32\u0E25": _3, "\u0E28\u0E36\u0E01\u0E29\u0E32": _3, "\u0E2D\u0E07\u0E04\u0E4C\u0E01\u0E23": _3 }], "xn--pgbs0dh": _3, "\u062A\u0648\u0646\u0633": _3, "xn--kpry57d": _3, "\u53F0\u7063": _3, "xn--kprw13d": _3, "\u53F0\u6E7E": _3, "xn--nnx388a": _3, "\u81FA\u7063": _3, "xn--j1amh": _3, "\u0443\u043A\u0440": _3, "xn--mgb2ddes": _3, "\u0627\u0644\u064A\u0645\u0646": _3, "xxx": _3, "ye": _6, "za": [0, { "ac": _3, "agric": _3, "alt": _3, "co": _3, "edu": _3, "gov": _3, "grondar": _3, "law": _3, "mil": _3, "net": _3, "ngo": _3, "nic": _3, "nis": _3, "nom": _3, "org": _3, "school": _3, "tm": _3, "web": _3 }], "zm": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "mil": _3, "net": _3, "org": _3, "sch": _3 }], "zw": [1, { "ac": _3, "co": _3, "gov": _3, "mil": _3, "org": _3 }], "aaa": _3, "aarp": _3, "abb": _3, "abbott": _3, "abbvie": _3, "abc": _3, "able": _3, "abogado": _3, "abudhabi": _3, "academy": [1, { "official": _4 }], "accenture": _3, "accountant": _3, "accountants": _3, "aco": _3, "actor": _3, "ads": _3, "adult": _3, "aeg": _3, "aetna": _3, "afl": _3, "africa": _3, "agakhan": _3, "agency": _3, "aig": _3, "airbus": _3, "airforce": _3, "airtel": _3, "akdn": _3, "alibaba": _3, "alipay": _3, "allfinanz": _3, "allstate": _3, "ally": _3, "alsace": _3, "alstom": _3, "amazon": _3, "americanexpress": _3, "americanfamily": _3, "amex": _3, "amfam": _3, "amica": _3, "amsterdam": _3, "analytics": _3, "android": _3, "anquan": _3, "anz": _3, "aol": _3, "apartments": _3, "app": [1, { "adaptable": _4, "aiven": _4, "beget": _7, "brave": _8, "clerk": _4, "clerkstage": _4, "wnext": _4, "csb": [2, { "preview": _4 }], "convex": _4, "deta": _4, "ondigitalocean": _4, "easypanel": _4, "encr": _4, "evervault": _9, "expo": [2, { "staging": _4 }], "edgecompute": _4, "on-fleek": _4, "flutterflow": _4, "e2b": _4, "framer": _4, "hosted": _7, "run": _7, "web": _4, "hasura": _4, "botdash": _4, "loginline": _4, "lovable": _4, "medusajs": _4, "messerli": _4, "netfy": _4, "netlify": _4, "ngrok": _4, "ngrok-free": _4, "developer": _7, "noop": _4, "northflank": _7, "upsun": _7, "replit": _10, "nyat": _4, "snowflake": [0, { "*": _4, "privatelink": _7 }], "streamlit": _4, "storipress": _4, "telebit": _4, "typedream": _4, "vercel": _4, "bookonline": _4, "wdh": _4, "windsurf": _4, "zeabur": _4, "zerops": _7 }], "apple": _3, "aquarelle": _3, "arab": _3, "aramco": _3, "archi": _3, "army": _3, "art": _3, "arte": _3, "asda": _3, "associates": _3, "athleta": _3, "attorney": _3, "auction": _3, "audi": _3, "audible": _3, "audio": _3, "auspost": _3, "author": _3, "auto": _3, "autos": _3, "aws": [1, { "sagemaker": [0, { "ap-northeast-1": _14, "ap-northeast-2": _14, "ap-south-1": _14, "ap-southeast-1": _14, "ap-southeast-2": _14, "ca-central-1": _16, "eu-central-1": _14, "eu-west-1": _14, "eu-west-2": _14, "us-east-1": _16, "us-east-2": _16, "us-west-2": _16, "af-south-1": _13, "ap-east-1": _13, "ap-northeast-3": _13, "ap-south-2": _15, "ap-southeast-3": _13, "ap-southeast-4": _15, "ca-west-1": [0, { "notebook": _4, "notebook-fips": _4 }], "eu-central-2": _13, "eu-north-1": _13, "eu-south-1": _13, "eu-south-2": _13, "eu-west-3": _13, "il-central-1": _13, "me-central-1": _13, "me-south-1": _13, "sa-east-1": _13, "us-gov-east-1": _17, "us-gov-west-1": _17, "us-west-1": [0, { "notebook": _4, "notebook-fips": _4, "studio": _4 }], "experiments": _7 }], "repost": [0, { "private": _7 }], "on": [0, { "ap-northeast-1": _12, "ap-southeast-1": _12, "ap-southeast-2": _12, "eu-central-1": _12, "eu-north-1": _12, "eu-west-1": _12, "us-east-1": _12, "us-east-2": _12, "us-west-2": _12 }] }], "axa": _3, "azure": _3, "baby": _3, "baidu": _3, "banamex": _3, "band": _3, "bank": _3, "bar": _3, "barcelona": _3, "barclaycard": _3, "barclays": _3, "barefoot": _3, "bargains": _3, "baseball": _3, "basketball": [1, { "aus": _4, "nz": _4 }], "bauhaus": _3, "bayern": _3, "bbc": _3, "bbt": _3, "bbva": _3, "bcg": _3, "bcn": _3, "beats": _3, "beauty": _3, "beer": _3, "bentley": _3, "berlin": _3, "best": _3, "bestbuy": _3, "bet": _3, "bharti": _3, "bible": _3, "bid": _3, "bike": _3, "bing": _3, "bingo": _3, "bio": _3, "black": _3, "blackfriday": _3, "blockbuster": _3, "blog": _3, "bloomberg": _3, "blue": _3, "bms": _3, "bmw": _3, "bnpparibas": _3, "boats": _3, "boehringer": _3, "bofa": _3, "bom": _3, "bond": _3, "boo": _3, "book": _3, "booking": _3, "bosch": _3, "bostik": _3, "boston": _3, "bot": _3, "boutique": _3, "box": _3, "bradesco": _3, "bridgestone": _3, "broadway": _3, "broker": _3, "brother": _3, "brussels": _3, "build": [1, { "v0": _4, "windsurf": _4 }], "builders": [1, { "cloudsite": _4 }], "business": _19, "buy": _3, "buzz": _3, "bzh": _3, "cab": _3, "cafe": _3, "cal": _3, "call": _3, "calvinklein": _3, "cam": _3, "camera": _3, "camp": [1, { "emf": [0, { "at": _4 }] }], "canon": _3, "capetown": _3, "capital": _3, "capitalone": _3, "car": _3, "caravan": _3, "cards": _3, "care": _3, "career": _3, "careers": _3, "cars": _3, "casa": [1, { "nabu": [0, { "ui": _4 }] }], "case": _3, "cash": _3, "casino": _3, "catering": _3, "catholic": _3, "cba": _3, "cbn": _3, "cbre": _3, "center": _3, "ceo": _3, "cern": _3, "cfa": _3, "cfd": _3, "chanel": _3, "channel": _3, "charity": _3, "chase": _3, "chat": _3, "cheap": _3, "chintai": _3, "christmas": _3, "chrome": _3, "church": _3, "cipriani": _3, "circle": _3, "cisco": _3, "citadel": _3, "citi": _3, "citic": _3, "city": _3, "claims": _3, "cleaning": _3, "click": _3, "clinic": _3, "clinique": _3, "clothing": _3, "cloud": [1, { "convex": _4, "elementor": _4, "encoway": [0, { "eu": _4 }], "statics": _7, "ravendb": _4, "axarnet": [0, { "es-1": _4 }], "diadem": _4, "jelastic": [0, { "vip": _4 }], "jele": _4, "jenv-aruba": [0, { "aruba": [0, { "eur": [0, { "it1": _4 }] }], "it1": _4 }], "keliweb": [2, { "cs": _4 }], "oxa": [2, { "tn": _4, "uk": _4 }], "primetel": [2, { "uk": _4 }], "reclaim": [0, { "ca": _4, "uk": _4, "us": _4 }], "trendhosting": [0, { "ch": _4, "de": _4 }], "jotelulu": _4, "kuleuven": _4, "laravel": _4, "linkyard": _4, "magentosite": _7, "matlab": _4, "observablehq": _4, "perspecta": _4, "vapor": _4, "on-rancher": _7, "scw": [0, { "baremetal": [0, { "fr-par-1": _4, "fr-par-2": _4, "nl-ams-1": _4 }], "fr-par": [0, { "cockpit": _4, "fnc": [2, { "functions": _4 }], "k8s": _21, "s3": _4, "s3-website": _4, "whm": _4 }], "instances": [0, { "priv": _4, "pub": _4 }], "k8s": _4, "nl-ams": [0, { "cockpit": _4, "k8s": _21, "s3": _4, "s3-website": _4, "whm": _4 }], "pl-waw": [0, { "cockpit": _4, "k8s": _21, "s3": _4, "s3-website": _4 }], "scalebook": _4, "smartlabeling": _4 }], "servebolt": _4, "onstackit": [0, { "runs": _4 }], "trafficplex": _4, "unison-services": _4, "urown": _4, "voorloper": _4, "zap": _4 }], "club": [1, { "cloudns": _4, "jele": _4, "barsy": _4 }], "clubmed": _3, "coach": _3, "codes": [1, { "owo": _7 }], "coffee": _3, "college": _3, "cologne": _3, "commbank": _3, "community": [1, { "nog": _4, "ravendb": _4, "myforum": _4 }], "company": _3, "compare": _3, "computer": _3, "comsec": _3, "condos": _3, "construction": _3, "consulting": _3, "contact": _3, "contractors": _3, "cooking": _3, "cool": [1, { "elementor": _4, "de": _4 }], "corsica": _3, "country": _3, "coupon": _3, "coupons": _3, "courses": _3, "cpa": _3, "credit": _3, "creditcard": _3, "creditunion": _3, "cricket": _3, "crown": _3, "crs": _3, "cruise": _3, "cruises": _3, "cuisinella": _3, "cymru": _3, "cyou": _3, "dad": _3, "dance": _3, "data": _3, "date": _3, "dating": _3, "datsun": _3, "day": _3, "dclk": _3, "dds": _3, "deal": _3, "dealer": _3, "deals": _3, "degree": _3, "delivery": _3, "dell": _3, "deloitte": _3, "delta": _3, "democrat": _3, "dental": _3, "dentist": _3, "desi": _3, "design": [1, { "graphic": _4, "bss": _4 }], "dev": [1, { "12chars": _4, "myaddr": _4, "panel": _4, "lcl": _7, "lclstage": _7, "stg": _7, "stgstage": _7, "pages": _4, "r2": _4, "workers": _4, "deno": _4, "deno-staging": _4, "deta": _4, "evervault": _9, "fly": _4, "githubpreview": _4, "gateway": _7, "hrsn": [2, { "psl": [0, { "sub": _4, "wc": [0, { "*": _4, "sub": _7 }] }] }], "botdash": _4, "inbrowser": _7, "is-a-good": _4, "is-a": _4, "iserv": _4, "runcontainers": _4, "localcert": [0, { "user": _7 }], "loginline": _4, "barsy": _4, "mediatech": _4, "modx": _4, "ngrok": _4, "ngrok-free": _4, "is-a-fullstack": _4, "is-cool": _4, "is-not-a": _4, "localplayer": _4, "xmit": _4, "platter-app": _4, "replit": [2, { "archer": _4, "bones": _4, "canary": _4, "global": _4, "hacker": _4, "id": _4, "janeway": _4, "kim": _4, "kira": _4, "kirk": _4, "odo": _4, "paris": _4, "picard": _4, "pike": _4, "prerelease": _4, "reed": _4, "riker": _4, "sisko": _4, "spock": _4, "staging": _4, "sulu": _4, "tarpit": _4, "teams": _4, "tucker": _4, "wesley": _4, "worf": _4 }], "crm": [0, { "d": _7, "w": _7, "wa": _7, "wb": _7, "wc": _7, "wd": _7, "we": _7, "wf": _7 }], "vercel": _4, "webhare": _7 }], "dhl": _3, "diamonds": _3, "diet": _3, "digital": [1, { "cloudapps": [2, { "london": _4 }] }], "direct": [1, { "libp2p": _4 }], "directory": _3, "discount": _3, "discover": _3, "dish": _3, "diy": _3, "dnp": _3, "docs": _3, "doctor": _3, "dog": _3, "domains": _3, "dot": _3, "download": _3, "drive": _3, "dtv": _3, "dubai": _3, "dunlop": _3, "dupont": _3, "durban": _3, "dvag": _3, "dvr": _3, "earth": _3, "eat": _3, "eco": _3, "edeka": _3, "education": _19, "email": [1, { "crisp": [0, { "on": _4 }], "tawk": _49, "tawkto": _49 }], "emerck": _3, "energy": _3, "engineer": _3, "engineering": _3, "enterprises": _3, "epson": _3, "equipment": _3, "ericsson": _3, "erni": _3, "esq": _3, "estate": [1, { "compute": _7 }], "eurovision": _3, "eus": [1, { "party": _50 }], "events": [1, { "koobin": _4, "co": _4 }], "exchange": _3, "expert": _3, "exposed": _3, "express": _3, "extraspace": _3, "fage": _3, "fail": _3, "fairwinds": _3, "faith": _3, "family": _3, "fan": _3, "fans": _3, "farm": [1, { "storj": _4 }], "farmers": _3, "fashion": _3, "fast": _3, "fedex": _3, "feedback": _3, "ferrari": _3, "ferrero": _3, "fidelity": _3, "fido": _3, "film": _3, "final": _3, "finance": _3, "financial": _19, "fire": _3, "firestone": _3, "firmdale": _3, "fish": _3, "fishing": _3, "fit": _3, "fitness": _3, "flickr": _3, "flights": _3, "flir": _3, "florist": _3, "flowers": _3, "fly": _3, "foo": _3, "food": _3, "football": _3, "ford": _3, "forex": _3, "forsale": _3, "forum": _3, "foundation": _3, "fox": _3, "free": _3, "fresenius": _3, "frl": _3, "frogans": _3, "frontier": _3, "ftr": _3, "fujitsu": _3, "fun": _3, "fund": _3, "furniture": _3, "futbol": _3, "fyi": _3, "gal": _3, "gallery": _3, "gallo": _3, "gallup": _3, "game": _3, "games": [1, { "pley": _4, "sheezy": _4 }], "gap": _3, "garden": _3, "gay": [1, { "pages": _4 }], "gbiz": _3, "gdn": [1, { "cnpy": _4 }], "gea": _3, "gent": _3, "genting": _3, "george": _3, "ggee": _3, "gift": _3, "gifts": _3, "gives": _3, "giving": _3, "glass": _3, "gle": _3, "global": [1, { "appwrite": _4 }], "globo": _3, "gmail": _3, "gmbh": _3, "gmo": _3, "gmx": _3, "godaddy": _3, "gold": _3, "goldpoint": _3, "golf": _3, "goo": _3, "goodyear": _3, "goog": [1, { "cloud": _4, "translate": _4, "usercontent": _7 }], "google": _3, "gop": _3, "got": _3, "grainger": _3, "graphics": _3, "gratis": _3, "green": _3, "gripe": _3, "grocery": _3, "group": [1, { "discourse": _4 }], "gucci": _3, "guge": _3, "guide": _3, "guitars": _3, "guru": _3, "hair": _3, "hamburg": _3, "hangout": _3, "haus": _3, "hbo": _3, "hdfc": _3, "hdfcbank": _3, "health": [1, { "hra": _4 }], "healthcare": _3, "help": _3, "helsinki": _3, "here": _3, "hermes": _3, "hiphop": _3, "hisamitsu": _3, "hitachi": _3, "hiv": _3, "hkt": _3, "hockey": _3, "holdings": _3, "holiday": _3, "homedepot": _3, "homegoods": _3, "homes": _3, "homesense": _3, "honda": _3, "horse": _3, "hospital": _3, "host": [1, { "cloudaccess": _4, "freesite": _4, "easypanel": _4, "fastvps": _4, "myfast": _4, "tempurl": _4, "wpmudev": _4, "jele": _4, "mircloud": _4, "wp2": _4, "half": _4 }], "hosting": [1, { "opencraft": _4 }], "hot": _3, "hotels": _3, "hotmail": _3, "house": _3, "how": _3, "hsbc": _3, "hughes": _3, "hyatt": _3, "hyundai": _3, "ibm": _3, "icbc": _3, "ice": _3, "icu": _3, "ieee": _3, "ifm": _3, "ikano": _3, "imamat": _3, "imdb": _3, "immo": _3, "immobilien": _3, "inc": _3, "industries": _3, "infiniti": _3, "ing": _3, "ink": _3, "institute": _3, "insurance": _3, "insure": _3, "international": _3, "intuit": _3, "investments": _3, "ipiranga": _3, "irish": _3, "ismaili": _3, "ist": _3, "istanbul": _3, "itau": _3, "itv": _3, "jaguar": _3, "java": _3, "jcb": _3, "jeep": _3, "jetzt": _3, "jewelry": _3, "jio": _3, "jll": _3, "jmp": _3, "jnj": _3, "joburg": _3, "jot": _3, "joy": _3, "jpmorgan": _3, "jprs": _3, "juegos": _3, "juniper": _3, "kaufen": _3, "kddi": _3, "kerryhotels": _3, "kerryproperties": _3, "kfh": _3, "kia": _3, "kids": _3, "kim": _3, "kindle": _3, "kitchen": _3, "kiwi": _3, "koeln": _3, "komatsu": _3, "kosher": _3, "kpmg": _3, "kpn": _3, "krd": [1, { "co": _4, "edu": _4 }], "kred": _3, "kuokgroup": _3, "kyoto": _3, "lacaixa": _3, "lamborghini": _3, "lamer": _3, "lancaster": _3, "land": _3, "landrover": _3, "lanxess": _3, "lasalle": _3, "lat": _3, "latino": _3, "latrobe": _3, "law": _3, "lawyer": _3, "lds": _3, "lease": _3, "leclerc": _3, "lefrak": _3, "legal": _3, "lego": _3, "lexus": _3, "lgbt": _3, "lidl": _3, "life": _3, "lifeinsurance": _3, "lifestyle": _3, "lighting": _3, "like": _3, "lilly": _3, "limited": _3, "limo": _3, "lincoln": _3, "link": [1, { "myfritz": _4, "cyon": _4, "dweb": _7, "inbrowser": _7, "nftstorage": _57, "mypep": _4, "storacha": _57, "w3s": _57 }], "live": [1, { "aem": _4, "hlx": _4, "ewp": _7 }], "living": _3, "llc": _3, "llp": _3, "loan": _3, "loans": _3, "locker": _3, "locus": _3, "lol": [1, { "omg": _4 }], "london": _3, "lotte": _3, "lotto": _3, "love": _3, "lpl": _3, "lplfinancial": _3, "ltd": _3, "ltda": _3, "lundbeck": _3, "luxe": _3, "luxury": _3, "madrid": _3, "maif": _3, "maison": _3, "makeup": _3, "man": _3, "management": _3, "mango": _3, "map": _3, "market": _3, "marketing": _3, "markets": _3, "marriott": _3, "marshalls": _3, "mattel": _3, "mba": _3, "mckinsey": _3, "med": _3, "media": _58, "meet": _3, "melbourne": _3, "meme": _3, "memorial": _3, "men": _3, "menu": [1, { "barsy": _4, "barsyonline": _4 }], "merck": _3, "merckmsd": _3, "miami": _3, "microsoft": _3, "mini": _3, "mint": _3, "mit": _3, "mitsubishi": _3, "mlb": _3, "mls": _3, "mma": _3, "mobile": _3, "moda": _3, "moe": _3, "moi": _3, "mom": [1, { "ind": _4 }], "monash": _3, "money": _3, "monster": _3, "mormon": _3, "mortgage": _3, "moscow": _3, "moto": _3, "motorcycles": _3, "mov": _3, "movie": _3, "msd": _3, "mtn": _3, "mtr": _3, "music": _3, "nab": _3, "nagoya": _3, "navy": _3, "nba": _3, "nec": _3, "netbank": _3, "netflix": _3, "network": [1, { "alces": _7, "co": _4, "arvo": _4, "azimuth": _4, "tlon": _4 }], "neustar": _3, "new": _3, "news": [1, { "noticeable": _4 }], "next": _3, "nextdirect": _3, "nexus": _3, "nfl": _3, "ngo": _3, "nhk": _3, "nico": _3, "nike": _3, "nikon": _3, "ninja": _3, "nissan": _3, "nissay": _3, "nokia": _3, "norton": _3, "now": _3, "nowruz": _3, "nowtv": _3, "nra": _3, "nrw": _3, "ntt": _3, "nyc": _3, "obi": _3, "observer": _3, "office": _3, "okinawa": _3, "olayan": _3, "olayangroup": _3, "ollo": _3, "omega": _3, "one": [1, { "kin": _7, "service": _4 }], "ong": [1, { "obl": _4 }], "onl": _3, "online": [1, { "eero": _4, "eero-stage": _4, "websitebuilder": _4, "barsy": _4 }], "ooo": _3, "open": _3, "oracle": _3, "orange": [1, { "tech": _4 }], "organic": _3, "origins": _3, "osaka": _3, "otsuka": _3, "ott": _3, "ovh": [1, { "nerdpol": _4 }], "page": [1, { "aem": _4, "hlx": _4, "hlx3": _4, "translated": _4, "codeberg": _4, "heyflow": _4, "prvcy": _4, "rocky": _4, "pdns": _4, "plesk": _4 }], "panasonic": _3, "paris": _3, "pars": _3, "partners": _3, "parts": _3, "party": _3, "pay": _3, "pccw": _3, "pet": _3, "pfizer": _3, "pharmacy": _3, "phd": _3, "philips": _3, "phone": _3, "photo": _3, "photography": _3, "photos": _58, "physio": _3, "pics": _3, "pictet": _3, "pictures": [1, { "1337": _4 }], "pid": _3, "pin": _3, "ping": _3, "pink": _3, "pioneer": _3, "pizza": [1, { "ngrok": _4 }], "place": _19, "play": _3, "playstation": _3, "plumbing": _3, "plus": _3, "pnc": _3, "pohl": _3, "poker": _3, "politie": _3, "porn": _3, "pramerica": _3, "praxi": _3, "press": _3, "prime": _3, "prod": _3, "productions": _3, "prof": _3, "progressive": _3, "promo": _3, "properties": _3, "property": _3, "protection": _3, "pru": _3, "prudential": _3, "pub": [1, { "id": _7, "kin": _7, "barsy": _4 }], "pwc": _3, "qpon": _3, "quebec": _3, "quest": _3, "racing": _3, "radio": _3, "read": _3, "realestate": _3, "realtor": _3, "realty": _3, "recipes": _3, "red": _3, "redstone": _3, "redumbrella": _3, "rehab": _3, "reise": _3, "reisen": _3, "reit": _3, "reliance": _3, "ren": _3, "rent": _3, "rentals": _3, "repair": _3, "report": _3, "republican": _3, "rest": _3, "restaurant": _3, "review": _3, "reviews": _3, "rexroth": _3, "rich": _3, "richardli": _3, "ricoh": _3, "ril": _3, "rio": _3, "rip": [1, { "clan": _4 }], "rocks": [1, { "myddns": _4, "stackit": _4, "lima-city": _4, "webspace": _4 }], "rodeo": _3, "rogers": _3, "room": _3, "rsvp": _3, "rugby": _3, "ruhr": _3, "run": [1, { "appwrite": _7, "development": _4, "ravendb": _4, "liara": [2, { "iran": _4 }], "servers": _4, "build": _7, "code": _7, "database": _7, "migration": _7, "onporter": _4, "repl": _4, "stackit": _4, "val": [0, { "express": _4, "web": _4 }], "wix": _4 }], "rwe": _3, "ryukyu": _3, "saarland": _3, "safe": _3, "safety": _3, "sakura": _3, "sale": _3, "salon": _3, "samsclub": _3, "samsung": _3, "sandvik": _3, "sandvikcoromant": _3, "sanofi": _3, "sap": _3, "sarl": _3, "sas": _3, "save": _3, "saxo": _3, "sbi": _3, "sbs": _3, "scb": _3, "schaeffler": _3, "schmidt": _3, "scholarships": _3, "school": _3, "schule": _3, "schwarz": _3, "science": _3, "scot": [1, { "gov": [2, { "service": _4 }] }], "search": _3, "seat": _3, "secure": _3, "security": _3, "seek": _3, "select": _3, "sener": _3, "services": [1, { "loginline": _4 }], "seven": _3, "sew": _3, "sex": _3, "sexy": _3, "sfr": _3, "shangrila": _3, "sharp": _3, "shell": _3, "shia": _3, "shiksha": _3, "shoes": _3, "shop": [1, { "base": _4, "hoplix": _4, "barsy": _4, "barsyonline": _4, "shopware": _4 }], "shopping": _3, "shouji": _3, "show": _3, "silk": _3, "sina": _3, "singles": _3, "site": [1, { "square": _4, "canva": _22, "cloudera": _7, "convex": _4, "cyon": _4, "fastvps": _4, "figma": _4, "heyflow": _4, "jele": _4, "jouwweb": _4, "loginline": _4, "barsy": _4, "notion": _4, "omniwe": _4, "opensocial": _4, "madethis": _4, "platformsh": _7, "tst": _7, "byen": _4, "srht": _4, "novecore": _4, "cpanel": _4, "wpsquared": _4 }], "ski": _3, "skin": _3, "sky": _3, "skype": _3, "sling": _3, "smart": _3, "smile": _3, "sncf": _3, "soccer": _3, "social": _3, "softbank": _3, "software": _3, "sohu": _3, "solar": _3, "solutions": _3, "song": _3, "sony": _3, "soy": _3, "spa": _3, "space": [1, { "myfast": _4, "heiyu": _4, "hf": [2, { "static": _4 }], "app-ionos": _4, "project": _4, "uber": _4, "xs4all": _4 }], "sport": _3, "spot": _3, "srl": _3, "stada": _3, "staples": _3, "star": _3, "statebank": _3, "statefarm": _3, "stc": _3, "stcgroup": _3, "stockholm": _3, "storage": _3, "store": [1, { "barsy": _4, "sellfy": _4, "shopware": _4, "storebase": _4 }], "stream": _3, "studio": _3, "study": _3, "style": _3, "sucks": _3, "supplies": _3, "supply": _3, "support": [1, { "barsy": _4 }], "surf": _3, "surgery": _3, "suzuki": _3, "swatch": _3, "swiss": _3, "sydney": _3, "systems": [1, { "knightpoint": _4 }], "tab": _3, "taipei": _3, "talk": _3, "taobao": _3, "target": _3, "tatamotors": _3, "tatar": _3, "tattoo": _3, "tax": _3, "taxi": _3, "tci": _3, "tdk": _3, "team": [1, { "discourse": _4, "jelastic": _4 }], "tech": [1, { "cleverapps": _4 }], "technology": _19, "temasek": _3, "tennis": _3, "teva": _3, "thd": _3, "theater": _3, "theatre": _3, "tiaa": _3, "tickets": _3, "tienda": _3, "tips": _3, "tires": _3, "tirol": _3, "tjmaxx": _3, "tjx": _3, "tkmaxx": _3, "tmall": _3, "today": [1, { "prequalifyme": _4 }], "tokyo": _3, "tools": [1, { "addr": _47, "myaddr": _4 }], "top": [1, { "ntdll": _4, "wadl": _7 }], "toray": _3, "toshiba": _3, "total": _3, "tours": _3, "town": _3, "toyota": _3, "toys": _3, "trade": _3, "trading": _3, "training": _3, "travel": _3, "travelers": _3, "travelersinsurance": _3, "trust": _3, "trv": _3, "tube": _3, "tui": _3, "tunes": _3, "tushu": _3, "tvs": _3, "ubank": _3, "ubs": _3, "unicom": _3, "university": _3, "uno": _3, "uol": _3, "ups": _3, "vacations": _3, "vana": _3, "vanguard": _3, "vegas": _3, "ventures": _3, "verisign": _3, "versicherung": _3, "vet": _3, "viajes": _3, "video": _3, "vig": _3, "viking": _3, "villas": _3, "vin": _3, "vip": _3, "virgin": _3, "visa": _3, "vision": _3, "viva": _3, "vivo": _3, "vlaanderen": _3, "vodka": _3, "volvo": _3, "vote": _3, "voting": _3, "voto": _3, "voyage": _3, "wales": _3, "walmart": _3, "walter": _3, "wang": _3, "wanggou": _3, "watch": _3, "watches": _3, "weather": _3, "weatherchannel": _3, "webcam": _3, "weber": _3, "website": _58, "wed": _3, "wedding": _3, "weibo": _3, "weir": _3, "whoswho": _3, "wien": _3, "wiki": _58, "williamhill": _3, "win": _3, "windows": _3, "wine": _3, "winners": _3, "wme": _3, "wolterskluwer": _3, "woodside": _3, "work": _3, "works": _3, "world": _3, "wow": _3, "wtc": _3, "wtf": _3, "xbox": _3, "xerox": _3, "xihuan": _3, "xin": _3, "xn--11b4c3d": _3, "\u0915\u0949\u092E": _3, "xn--1ck2e1b": _3, "\u30BB\u30FC\u30EB": _3, "xn--1qqw23a": _3, "\u4F5B\u5C71": _3, "xn--30rr7y": _3, "\u6148\u5584": _3, "xn--3bst00m": _3, "\u96C6\u56E2": _3, "xn--3ds443g": _3, "\u5728\u7EBF": _3, "xn--3pxu8k": _3, "\u70B9\u770B": _3, "xn--42c2d9a": _3, "\u0E04\u0E2D\u0E21": _3, "xn--45q11c": _3, "\u516B\u5366": _3, "xn--4gbrim": _3, "\u0645\u0648\u0642\u0639": _3, "xn--55qw42g": _3, "\u516C\u76CA": _3, "xn--55qx5d": _3, "\u516C\u53F8": _3, "xn--5su34j936bgsg": _3, "\u9999\u683C\u91CC\u62C9": _3, "xn--5tzm5g": _3, "\u7F51\u7AD9": _3, "xn--6frz82g": _3, "\u79FB\u52A8": _3, "xn--6qq986b3xl": _3, "\u6211\u7231\u4F60": _3, "xn--80adxhks": _3, "\u043C\u043E\u0441\u043A\u0432\u0430": _3, "xn--80aqecdr1a": _3, "\u043A\u0430\u0442\u043E\u043B\u0438\u043A": _3, "xn--80asehdb": _3, "\u043E\u043D\u043B\u0430\u0439\u043D": _3, "xn--80aswg": _3, "\u0441\u0430\u0439\u0442": _3, "xn--8y0a063a": _3, "\u8054\u901A": _3, "xn--9dbq2a": _3, "\u05E7\u05D5\u05DD": _3, "xn--9et52u": _3, "\u65F6\u5C1A": _3, "xn--9krt00a": _3, "\u5FAE\u535A": _3, "xn--b4w605ferd": _3, "\u6DE1\u9A6C\u9521": _3, "xn--bck1b9a5dre4c": _3, "\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3": _3, "xn--c1avg": _3, "\u043E\u0440\u0433": _3, "xn--c2br7g": _3, "\u0928\u0947\u091F": _3, "xn--cck2b3b": _3, "\u30B9\u30C8\u30A2": _3, "xn--cckwcxetd": _3, "\u30A2\u30DE\u30BE\u30F3": _3, "xn--cg4bki": _3, "\uC0BC\uC131": _3, "xn--czr694b": _3, "\u5546\u6807": _3, "xn--czrs0t": _3, "\u5546\u5E97": _3, "xn--czru2d": _3, "\u5546\u57CE": _3, "xn--d1acj3b": _3, "\u0434\u0435\u0442\u0438": _3, "xn--eckvdtc9d": _3, "\u30DD\u30A4\u30F3\u30C8": _3, "xn--efvy88h": _3, "\u65B0\u95FB": _3, "xn--fct429k": _3, "\u5BB6\u96FB": _3, "xn--fhbei": _3, "\u0643\u0648\u0645": _3, "xn--fiq228c5hs": _3, "\u4E2D\u6587\u7F51": _3, "xn--fiq64b": _3, "\u4E2D\u4FE1": _3, "xn--fjq720a": _3, "\u5A31\u4E50": _3, "xn--flw351e": _3, "\u8C37\u6B4C": _3, "xn--fzys8d69uvgm": _3, "\u96FB\u8A0A\u76C8\u79D1": _3, "xn--g2xx48c": _3, "\u8D2D\u7269": _3, "xn--gckr3f0f": _3, "\u30AF\u30E9\u30A6\u30C9": _3, "xn--gk3at1e": _3, "\u901A\u8CA9": _3, "xn--hxt814e": _3, "\u7F51\u5E97": _3, "xn--i1b6b1a6a2e": _3, "\u0938\u0902\u0917\u0920\u0928": _3, "xn--imr513n": _3, "\u9910\u5385": _3, "xn--io0a7i": _3, "\u7F51\u7EDC": _3, "xn--j1aef": _3, "\u043A\u043E\u043C": _3, "xn--jlq480n2rg": _3, "\u4E9A\u9A6C\u900A": _3, "xn--jvr189m": _3, "\u98DF\u54C1": _3, "xn--kcrx77d1x4a": _3, "\u98DE\u5229\u6D66": _3, "xn--kput3i": _3, "\u624B\u673A": _3, "xn--mgba3a3ejt": _3, "\u0627\u0631\u0627\u0645\u0643\u0648": _3, "xn--mgba7c0bbn0a": _3, "\u0627\u0644\u0639\u0644\u064A\u0627\u0646": _3, "xn--mgbab2bd": _3, "\u0628\u0627\u0632\u0627\u0631": _3, "xn--mgbca7dzdo": _3, "\u0627\u0628\u0648\u0638\u0628\u064A": _3, "xn--mgbi4ecexp": _3, "\u0643\u0627\u062B\u0648\u0644\u064A\u0643": _3, "xn--mgbt3dhd": _3, "\u0647\u0645\u0631\u0627\u0647": _3, "xn--mk1bu44c": _3, "\uB2F7\uCEF4": _3, "xn--mxtq1m": _3, "\u653F\u5E9C": _3, "xn--ngbc5azd": _3, "\u0634\u0628\u0643\u0629": _3, "xn--ngbe9e0a": _3, "\u0628\u064A\u062A\u0643": _3, "xn--ngbrx": _3, "\u0639\u0631\u0628": _3, "xn--nqv7f": _3, "\u673A\u6784": _3, "xn--nqv7fs00ema": _3, "\u7EC4\u7EC7\u673A\u6784": _3, "xn--nyqy26a": _3, "\u5065\u5EB7": _3, "xn--otu796d": _3, "\u62DB\u8058": _3, "xn--p1acf": [1, { "xn--90amc": _4, "xn--j1aef": _4, "xn--j1ael8b": _4, "xn--h1ahn": _4, "xn--j1adp": _4, "xn--c1avg": _4, "xn--80aaa0cvac": _4, "xn--h1aliz": _4, "xn--90a1af": _4, "xn--41a": _4 }], "\u0440\u0443\u0441": [1, { "\u0431\u0438\u0437": _4, "\u043A\u043E\u043C": _4, "\u043A\u0440\u044B\u043C": _4, "\u043C\u0438\u0440": _4, "\u043C\u0441\u043A": _4, "\u043E\u0440\u0433": _4, "\u0441\u0430\u043C\u0430\u0440\u0430": _4, "\u0441\u043E\u0447\u0438": _4, "\u0441\u043F\u0431": _4, "\u044F": _4 }], "xn--pssy2u": _3, "\u5927\u62FF": _3, "xn--q9jyb4c": _3, "\u307F\u3093\u306A": _3, "xn--qcka1pmc": _3, "\u30B0\u30FC\u30B0\u30EB": _3, "xn--rhqv96g": _3, "\u4E16\u754C": _3, "xn--rovu88b": _3, "\u66F8\u7C4D": _3, "xn--ses554g": _3, "\u7F51\u5740": _3, "xn--t60b56a": _3, "\uB2F7\uB137": _3, "xn--tckwe": _3, "\u30B3\u30E0": _3, "xn--tiq49xqyj": _3, "\u5929\u4E3B\u6559": _3, "xn--unup4y": _3, "\u6E38\u620F": _3, "xn--vermgensberater-ctb": _3, "verm\xF6gensberater": _3, "xn--vermgensberatung-pwb": _3, "verm\xF6gensberatung": _3, "xn--vhquv": _3, "\u4F01\u4E1A": _3, "xn--vuq861b": _3, "\u4FE1\u606F": _3, "xn--w4r85el8fhu5dnra": _3, "\u5609\u91CC\u5927\u9152\u5E97": _3, "xn--w4rs40l": _3, "\u5609\u91CC": _3, "xn--xhq521b": _3, "\u5E7F\u4E1C": _3, "xn--zfr164b": _3, "\u653F\u52A1": _3, "xyz": [1, { "botdash": _4, "telebit": _7 }], "yachts": _3, "yahoo": _3, "yamaxun": _3, "yandex": _3, "yodobashi": _3, "yoga": _3, "yokohama": _3, "you": _3, "youtube": _3, "yun": _3, "zappos": _3, "zara": _3, "zero": _3, "zip": _3, "zone": [1, { "cloud66": _4, "triton": _7, "stackit": _4, "lima": _4 }], "zuerich": _3 }];
      return rules2;
    })();
    function lookupInTrie(parts, trie, index, allowedMask) {
      let result = null;
      let node = trie;
      while (node !== void 0) {
        if ((node[0] & allowedMask) !== 0) {
          result = {
            index: index + 1,
            isIcann: node[0] === 1,
            isPrivate: node[0] === 2
          };
        }
        if (index === -1) {
          break;
        }
        const succ = node[1];
        node = Object.prototype.hasOwnProperty.call(succ, parts[index]) ? succ[parts[index]] : succ["*"];
        index -= 1;
      }
      return result;
    }
    function suffixLookup(hostname, options2, out) {
      var _a;
      if (fastPathLookup(hostname, options2, out)) {
        return;
      }
      const hostnameParts = hostname.split(".");
      const allowedMask = (options2.allowPrivateDomains ? 2 : 0) | (options2.allowIcannDomains ? 1 : 0);
      const exceptionMatch = lookupInTrie(hostnameParts, exceptions, hostnameParts.length - 1, allowedMask);
      if (exceptionMatch !== null) {
        out.isIcann = exceptionMatch.isIcann;
        out.isPrivate = exceptionMatch.isPrivate;
        out.publicSuffix = hostnameParts.slice(exceptionMatch.index + 1).join(".");
        return;
      }
      const rulesMatch = lookupInTrie(hostnameParts, rules, hostnameParts.length - 1, allowedMask);
      if (rulesMatch !== null) {
        out.isIcann = rulesMatch.isIcann;
        out.isPrivate = rulesMatch.isPrivate;
        out.publicSuffix = hostnameParts.slice(rulesMatch.index).join(".");
        return;
      }
      out.isIcann = false;
      out.isPrivate = false;
      out.publicSuffix = (_a = hostnameParts[hostnameParts.length - 1]) !== null && _a !== void 0 ? _a : null;
    }
    var RESULT = getEmptyResult();
    function parse(url, options2 = {}) {
      return parseImpl(url, 5, suffixLookup, options2, getEmptyResult());
    }
    function getHostname(url, options2 = {}) {
      resetResult(RESULT);
      return parseImpl(url, 0, suffixLookup, options2, RESULT).hostname;
    }
    function getPublicSuffix(url, options2 = {}) {
      resetResult(RESULT);
      return parseImpl(url, 2, suffixLookup, options2, RESULT).publicSuffix;
    }
    function getDomain(url, options2 = {}) {
      resetResult(RESULT);
      return parseImpl(url, 3, suffixLookup, options2, RESULT).domain;
    }
    function getSubdomain(url, options2 = {}) {
      resetResult(RESULT);
      return parseImpl(url, 4, suffixLookup, options2, RESULT).subdomain;
    }
    function getDomainWithoutSuffix(url, options2 = {}) {
      resetResult(RESULT);
      return parseImpl(url, 5, suffixLookup, options2, RESULT).domainWithoutSuffix;
    }
    exports2.getDomain = getDomain;
    exports2.getDomainWithoutSuffix = getDomainWithoutSuffix;
    exports2.getHostname = getHostname;
    exports2.getPublicSuffix = getPublicSuffix;
    exports2.getSubdomain = getSubdomain;
    exports2.parse = parse;
  }
});

// node_modules/tough-cookie/dist/getPublicSuffix.js
var require_getPublicSuffix = __commonJS({
  "node_modules/tough-cookie/dist/getPublicSuffix.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getPublicSuffix = getPublicSuffix;
    var tldts_1 = require_cjs();
    var SPECIAL_USE_DOMAINS = ["local", "example", "invalid", "localhost", "test"];
    var SPECIAL_TREATMENT_DOMAINS = ["localhost", "invalid"];
    var defaultGetPublicSuffixOptions = {
      allowSpecialUseDomain: false,
      ignoreError: false
    };
    function getPublicSuffix(domain, options2 = {}) {
      options2 = { ...defaultGetPublicSuffixOptions, ...options2 };
      const domainParts = domain.split(".");
      const topLevelDomain = domainParts[domainParts.length - 1];
      const allowSpecialUseDomain = !!options2.allowSpecialUseDomain;
      const ignoreError = !!options2.ignoreError;
      if (allowSpecialUseDomain && topLevelDomain !== void 0 && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
        if (domainParts.length > 1) {
          const secondLevelDomain = domainParts[domainParts.length - 2];
          return `${secondLevelDomain}.${topLevelDomain}`;
        } else if (SPECIAL_TREATMENT_DOMAINS.includes(topLevelDomain)) {
          return topLevelDomain;
        }
      }
      if (!ignoreError && topLevelDomain !== void 0 && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
        throw new Error(`Cookie has domain set to the public suffix "${topLevelDomain}" which is a special use domain. To allow this, configure your CookieJar with {allowSpecialUseDomain: true, rejectPublicSuffixes: false}.`);
      }
      const publicSuffix = (0, tldts_1.getDomain)(domain, {
        allowIcannDomains: true,
        allowPrivateDomains: true
      });
      if (publicSuffix)
        return publicSuffix;
    }
  }
});

// node_modules/tough-cookie/dist/permuteDomain.js
var require_permuteDomain = __commonJS({
  "node_modules/tough-cookie/dist/permuteDomain.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.permuteDomain = permuteDomain;
    var getPublicSuffix_1 = require_getPublicSuffix();
    function permuteDomain(domain, allowSpecialUseDomain) {
      const pubSuf = (0, getPublicSuffix_1.getPublicSuffix)(domain, {
        allowSpecialUseDomain
      });
      if (!pubSuf) {
        return void 0;
      }
      if (pubSuf == domain) {
        return [domain];
      }
      if (domain.slice(-1) == ".") {
        domain = domain.slice(0, -1);
      }
      const prefix = domain.slice(0, -(pubSuf.length + 1));
      const parts = prefix.split(".").reverse();
      let cur = pubSuf;
      const permutations = [cur];
      while (parts.length) {
        const part = parts.shift();
        cur = `${part}.${cur}`;
        permutations.push(cur);
      }
      return permutations;
    }
  }
});

// node_modules/tough-cookie/dist/store.js
var require_store = __commonJS({
  "node_modules/tough-cookie/dist/store.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Store = void 0;
    var Store2 = class {
      constructor() {
        this.synchronous = false;
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      findCookie(_domain, _path, _key, _callback) {
        throw new Error("findCookie is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      findCookies(_domain, _path, _allowSpecialUseDomain = false, _callback) {
        throw new Error("findCookies is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      putCookie(_cookie, _callback) {
        throw new Error("putCookie is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      updateCookie(_oldCookie, _newCookie, _callback) {
        throw new Error("updateCookie is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeCookie(_domain, _path, _key, _callback) {
        throw new Error("removeCookie is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeCookies(_domain, _path, _callback) {
        throw new Error("removeCookies is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeAllCookies(_callback) {
        throw new Error("removeAllCookies is not implemented");
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      getAllCookies(_callback) {
        throw new Error("getAllCookies is not implemented (therefore jar cannot be serialized)");
      }
    };
    exports2.Store = Store2;
  }
});

// node_modules/tough-cookie/dist/utils.js
var require_utils = __commonJS({
  "node_modules/tough-cookie/dist/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.safeToString = exports2.objectToString = void 0;
    exports2.createPromiseCallback = createPromiseCallback;
    exports2.inOperator = inOperator;
    var objectToString = (obj) => Object.prototype.toString.call(obj);
    exports2.objectToString = objectToString;
    var safeArrayToString = (arr, seenArrays) => {
      if (typeof arr.join !== "function")
        return (0, exports2.objectToString)(arr);
      seenArrays.add(arr);
      const mapped = arr.map((val) => val === null || val === void 0 || seenArrays.has(val) ? "" : safeToStringImpl(val, seenArrays));
      return mapped.join();
    };
    var safeToStringImpl = (val, seenArrays = /* @__PURE__ */ new WeakSet()) => {
      if (typeof val !== "object" || val === null) {
        return String(val);
      } else if (typeof val.toString === "function") {
        return Array.isArray(val) ? (
          // Arrays have a weird custom toString that we need to replicate
          safeArrayToString(val, seenArrays)
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          String(val)
        );
      } else {
        return (0, exports2.objectToString)(val);
      }
    };
    var safeToString = (val) => safeToStringImpl(val);
    exports2.safeToString = safeToString;
    function createPromiseCallback(cb) {
      let callback;
      let resolve;
      let reject;
      const promise2 = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });
      if (typeof cb === "function") {
        callback = (err, result) => {
          try {
            if (err)
              cb(err);
            else
              cb(null, result);
          } catch (e) {
            reject(e instanceof Error ? e : new Error());
          }
        };
      } else {
        callback = (err, result) => {
          try {
            if (err)
              reject(err);
            else
              resolve(result);
          } catch (e) {
            reject(e instanceof Error ? e : new Error());
          }
        };
      }
      return {
        promise: promise2,
        callback,
        resolve: (value) => {
          callback(null, value);
          return promise2;
        },
        reject: (error) => {
          callback(error);
          return promise2;
        }
      };
    }
    function inOperator(k, o) {
      return k in o;
    }
  }
});

// node_modules/tough-cookie/dist/memstore.js
var require_memstore = __commonJS({
  "node_modules/tough-cookie/dist/memstore.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MemoryCookieStore = void 0;
    var pathMatch_1 = require_pathMatch();
    var permuteDomain_1 = require_permuteDomain();
    var store_1 = require_store();
    var utils_1 = require_utils();
    var MemoryCookieStore = class extends store_1.Store {
      /**
       * Create a new {@link MemoryCookieStore}.
       */
      constructor() {
        super();
        this.synchronous = true;
        this.idx = /* @__PURE__ */ Object.create(null);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      findCookie(domain, path, key, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        if (domain == null || path == null || key == null) {
          return promiseCallback.resolve(void 0);
        }
        const result = this.idx[domain]?.[path]?.[key];
        return promiseCallback.resolve(result);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      findCookies(domain, path, allowSpecialUseDomain = false, callback) {
        if (typeof allowSpecialUseDomain === "function") {
          callback = allowSpecialUseDomain;
          allowSpecialUseDomain = true;
        }
        const results = [];
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        if (!domain) {
          return promiseCallback.resolve([]);
        }
        let pathMatcher;
        if (!path) {
          pathMatcher = function matchAll(domainIndex) {
            for (const curPath in domainIndex) {
              const pathIndex = domainIndex[curPath];
              for (const key in pathIndex) {
                const value = pathIndex[key];
                if (value) {
                  results.push(value);
                }
              }
            }
          };
        } else {
          pathMatcher = function matchRFC(domainIndex) {
            for (const cookiePath in domainIndex) {
              if ((0, pathMatch_1.pathMatch)(path, cookiePath)) {
                const pathIndex = domainIndex[cookiePath];
                for (const key in pathIndex) {
                  const value = pathIndex[key];
                  if (value) {
                    results.push(value);
                  }
                }
              }
            }
          };
        }
        const domains = (0, permuteDomain_1.permuteDomain)(domain, allowSpecialUseDomain) || [domain];
        const idx = this.idx;
        domains.forEach((curDomain) => {
          const domainIndex = idx[curDomain];
          if (!domainIndex) {
            return;
          }
          pathMatcher(domainIndex);
        });
        return promiseCallback.resolve(results);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      putCookie(cookie, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const { domain, path, key } = cookie;
        if (domain == null || path == null || key == null) {
          return promiseCallback.resolve(void 0);
        }
        const domainEntry = this.idx[domain] ?? /* @__PURE__ */ Object.create(null);
        this.idx[domain] = domainEntry;
        const pathEntry = domainEntry[path] ?? /* @__PURE__ */ Object.create(null);
        domainEntry[path] = pathEntry;
        pathEntry[key] = cookie;
        return promiseCallback.resolve(void 0);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      updateCookie(_oldCookie, newCookie, callback) {
        if (callback)
          this.putCookie(newCookie, callback);
        else
          return this.putCookie(newCookie);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeCookie(domain, path, key, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        delete this.idx[domain]?.[path]?.[key];
        return promiseCallback.resolve(void 0);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeCookies(domain, path, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const domainEntry = this.idx[domain];
        if (domainEntry) {
          if (path) {
            delete domainEntry[path];
          } else {
            delete this.idx[domain];
          }
        }
        return promiseCallback.resolve(void 0);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      removeAllCookies(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        this.idx = /* @__PURE__ */ Object.create(null);
        return promiseCallback.resolve(void 0);
      }
      /**
       * @internal No doc because this is an overload that supports the implementation
       */
      getAllCookies(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cookies = [];
        const idx = this.idx;
        const domains = Object.keys(idx);
        domains.forEach((domain) => {
          const domainEntry = idx[domain] ?? {};
          const paths = Object.keys(domainEntry);
          paths.forEach((path) => {
            const pathEntry = domainEntry[path] ?? {};
            const keys = Object.keys(pathEntry);
            keys.forEach((key) => {
              const keyEntry = pathEntry[key];
              if (keyEntry != null) {
                cookies.push(keyEntry);
              }
            });
          });
        });
        cookies.sort((a, b) => {
          return (a.creationIndex || 0) - (b.creationIndex || 0);
        });
        return promiseCallback.resolve(cookies);
      }
    };
    exports2.MemoryCookieStore = MemoryCookieStore;
  }
});

// node_modules/tough-cookie/dist/validators.js
var require_validators = __commonJS({
  "node_modules/tough-cookie/dist/validators.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ParameterError = void 0;
    exports2.isNonEmptyString = isNonEmptyString;
    exports2.isDate = isDate;
    exports2.isEmptyString = isEmptyString;
    exports2.isString = isString;
    exports2.isObject = isObject;
    exports2.isInteger = isInteger;
    exports2.validate = validate2;
    var utils_1 = require_utils();
    function isNonEmptyString(data) {
      return isString(data) && data !== "";
    }
    function isDate(data) {
      return data instanceof Date && isInteger(data.getTime());
    }
    function isEmptyString(data) {
      return data === "" || data instanceof String && data.toString() === "";
    }
    function isString(data) {
      return typeof data === "string" || data instanceof String;
    }
    function isObject(data) {
      return (0, utils_1.objectToString)(data) === "[object Object]";
    }
    function isInteger(data) {
      return typeof data === "number" && data % 1 === 0;
    }
    function validate2(bool, cbOrMessage, message) {
      if (bool)
        return;
      const cb = typeof cbOrMessage === "function" ? cbOrMessage : void 0;
      let options2 = typeof cbOrMessage === "function" ? message : cbOrMessage;
      if (!isObject(options2))
        options2 = "[object Object]";
      const err = new ParameterError((0, utils_1.safeToString)(options2));
      if (cb)
        cb(err);
      else
        throw err;
    }
    var ParameterError = class extends Error {
    };
    exports2.ParameterError = ParameterError;
  }
});

// node_modules/tough-cookie/dist/version.js
var require_version = __commonJS({
  "node_modules/tough-cookie/dist/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.version = void 0;
    exports2.version = "5.1.2";
  }
});

// node_modules/tough-cookie/dist/cookie/constants.js
var require_constants = __commonJS({
  "node_modules/tough-cookie/dist/cookie/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IP_V6_REGEX_OBJECT = exports2.PrefixSecurityEnum = void 0;
    exports2.PrefixSecurityEnum = {
      SILENT: "silent",
      STRICT: "strict",
      DISABLED: "unsafe-disabled"
    };
    Object.freeze(exports2.PrefixSecurityEnum);
    var IP_V6_REGEX = `
\\[?(?:
(?:[a-fA-F\\d]{1,4}:){7}(?:[a-fA-F\\d]{1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-fA-F\\d]{1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,2}|:)|
(?:[a-fA-F\\d]{1,4}:){4}(?:(?::[a-fA-F\\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,3}|:)|
(?:[a-fA-F\\d]{1,4}:){3}(?:(?::[a-fA-F\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){2}(?:(?::[a-fA-F\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,5}|:)|
(?:[a-fA-F\\d]{1,4}:){1}(?:(?::[a-fA-F\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,6}|:)|
(?::(?:(?::[a-fA-F\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,7}|:))
)(?:%[0-9a-zA-Z]{1,})?\\]?
`.replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
    exports2.IP_V6_REGEX_OBJECT = new RegExp(`^${IP_V6_REGEX}$`);
  }
});

// node_modules/tough-cookie/dist/cookie/canonicalDomain.js
var require_canonicalDomain = __commonJS({
  "node_modules/tough-cookie/dist/cookie/canonicalDomain.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.canonicalDomain = canonicalDomain;
    var constants_1 = require_constants();
    function domainToASCII(domain) {
      return new URL(`http://${domain}`).hostname;
    }
    function canonicalDomain(domainName) {
      if (domainName == null) {
        return void 0;
      }
      let str = domainName.trim().replace(/^\./, "");
      if (constants_1.IP_V6_REGEX_OBJECT.test(str)) {
        if (!str.startsWith("[")) {
          str = "[" + str;
        }
        if (!str.endsWith("]")) {
          str = str + "]";
        }
        return domainToASCII(str).slice(1, -1);
      }
      if (/[^\u0001-\u007f]/.test(str)) {
        return domainToASCII(str);
      }
      return str.toLowerCase();
    }
  }
});

// node_modules/tough-cookie/dist/cookie/formatDate.js
var require_formatDate = __commonJS({
  "node_modules/tough-cookie/dist/cookie/formatDate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatDate = formatDate;
    function formatDate(date) {
      return date.toUTCString();
    }
  }
});

// node_modules/tough-cookie/dist/cookie/parseDate.js
var require_parseDate = __commonJS({
  "node_modules/tough-cookie/dist/cookie/parseDate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseDate = parseDate;
    var DATE_DELIM = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/;
    var MONTH_TO_NUM = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11
    };
    function parseDigits(token, minDigits, maxDigits, trailingOK) {
      let count = 0;
      while (count < token.length) {
        const c = token.charCodeAt(count);
        if (c <= 47 || c >= 58) {
          break;
        }
        count++;
      }
      if (count < minDigits || count > maxDigits) {
        return;
      }
      if (!trailingOK && count != token.length) {
        return;
      }
      return parseInt(token.slice(0, count), 10);
    }
    function parseTime(token) {
      const parts = token.split(":");
      const result = [0, 0, 0];
      if (parts.length !== 3) {
        return;
      }
      for (let i = 0; i < 3; i++) {
        const trailingOK = i == 2;
        const numPart = parts[i];
        if (numPart === void 0) {
          return;
        }
        const num = parseDigits(numPart, 1, 2, trailingOK);
        if (num === void 0) {
          return;
        }
        result[i] = num;
      }
      return result;
    }
    function parseMonth(token) {
      token = String(token).slice(0, 3).toLowerCase();
      switch (token) {
        case "jan":
          return MONTH_TO_NUM.jan;
        case "feb":
          return MONTH_TO_NUM.feb;
        case "mar":
          return MONTH_TO_NUM.mar;
        case "apr":
          return MONTH_TO_NUM.apr;
        case "may":
          return MONTH_TO_NUM.may;
        case "jun":
          return MONTH_TO_NUM.jun;
        case "jul":
          return MONTH_TO_NUM.jul;
        case "aug":
          return MONTH_TO_NUM.aug;
        case "sep":
          return MONTH_TO_NUM.sep;
        case "oct":
          return MONTH_TO_NUM.oct;
        case "nov":
          return MONTH_TO_NUM.nov;
        case "dec":
          return MONTH_TO_NUM.dec;
        default:
          return;
      }
    }
    function parseDate(cookieDate) {
      if (!cookieDate) {
        return;
      }
      const tokens = cookieDate.split(DATE_DELIM);
      let hour;
      let minute;
      let second;
      let dayOfMonth;
      let month;
      let year;
      for (let i = 0; i < tokens.length; i++) {
        const token = (tokens[i] ?? "").trim();
        if (!token.length) {
          continue;
        }
        if (second === void 0) {
          const result = parseTime(token);
          if (result) {
            hour = result[0];
            minute = result[1];
            second = result[2];
            continue;
          }
        }
        if (dayOfMonth === void 0) {
          const result = parseDigits(token, 1, 2, true);
          if (result !== void 0) {
            dayOfMonth = result;
            continue;
          }
        }
        if (month === void 0) {
          const result = parseMonth(token);
          if (result !== void 0) {
            month = result;
            continue;
          }
        }
        if (year === void 0) {
          const result = parseDigits(token, 2, 4, true);
          if (result !== void 0) {
            year = result;
            if (year >= 70 && year <= 99) {
              year += 1900;
            } else if (year >= 0 && year <= 69) {
              year += 2e3;
            }
          }
        }
      }
      if (dayOfMonth === void 0 || month === void 0 || year === void 0 || hour === void 0 || minute === void 0 || second === void 0 || dayOfMonth < 1 || dayOfMonth > 31 || year < 1601 || hour > 23 || minute > 59 || second > 59) {
        return;
      }
      return new Date(Date.UTC(year, month, dayOfMonth, hour, minute, second));
    }
  }
});

// node_modules/tough-cookie/dist/cookie/cookie.js
var require_cookie = __commonJS({
  "node_modules/tough-cookie/dist/cookie/cookie.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Cookie = void 0;
    var getPublicSuffix_1 = require_getPublicSuffix();
    var validators = __importStar(require_validators());
    var utils_1 = require_utils();
    var formatDate_1 = require_formatDate();
    var parseDate_1 = require_parseDate();
    var canonicalDomain_1 = require_canonicalDomain();
    var COOKIE_OCTETS = /^[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]+$/;
    var PATH_VALUE = /[\x20-\x3A\x3C-\x7E]+/;
    var CONTROL_CHARS = /[\x00-\x1F]/;
    var TERMINATORS = ["\n", "\r", "\0"];
    function trimTerminator(str) {
      if (validators.isEmptyString(str))
        return str;
      for (let t = 0; t < TERMINATORS.length; t++) {
        const terminator = TERMINATORS[t];
        const terminatorIdx = terminator ? str.indexOf(terminator) : -1;
        if (terminatorIdx !== -1) {
          str = str.slice(0, terminatorIdx);
        }
      }
      return str;
    }
    function parseCookiePair(cookiePair, looseMode) {
      cookiePair = trimTerminator(cookiePair);
      let firstEq = cookiePair.indexOf("=");
      if (looseMode) {
        if (firstEq === 0) {
          cookiePair = cookiePair.substring(1);
          firstEq = cookiePair.indexOf("=");
        }
      } else {
        if (firstEq <= 0) {
          return void 0;
        }
      }
      let cookieName, cookieValue;
      if (firstEq <= 0) {
        cookieName = "";
        cookieValue = cookiePair.trim();
      } else {
        cookieName = cookiePair.slice(0, firstEq).trim();
        cookieValue = cookiePair.slice(firstEq + 1).trim();
      }
      if (CONTROL_CHARS.test(cookieName) || CONTROL_CHARS.test(cookieValue)) {
        return void 0;
      }
      const c = new Cookie3();
      c.key = cookieName;
      c.value = cookieValue;
      return c;
    }
    function parse(str, options2) {
      if (validators.isEmptyString(str) || !validators.isString(str)) {
        return void 0;
      }
      str = str.trim();
      const firstSemi = str.indexOf(";");
      const cookiePair = firstSemi === -1 ? str : str.slice(0, firstSemi);
      const c = parseCookiePair(cookiePair, options2?.loose ?? false);
      if (!c) {
        return void 0;
      }
      if (firstSemi === -1) {
        return c;
      }
      const unparsed = str.slice(firstSemi + 1).trim();
      if (unparsed.length === 0) {
        return c;
      }
      const cookie_avs = unparsed.split(";");
      while (cookie_avs.length) {
        const av = (cookie_avs.shift() ?? "").trim();
        if (av.length === 0) {
          continue;
        }
        const av_sep = av.indexOf("=");
        let av_key, av_value;
        if (av_sep === -1) {
          av_key = av;
          av_value = null;
        } else {
          av_key = av.slice(0, av_sep);
          av_value = av.slice(av_sep + 1);
        }
        av_key = av_key.trim().toLowerCase();
        if (av_value) {
          av_value = av_value.trim();
        }
        switch (av_key) {
          case "expires":
            if (av_value) {
              const exp = (0, parseDate_1.parseDate)(av_value);
              if (exp) {
                c.expires = exp;
              }
            }
            break;
          case "max-age":
            if (av_value) {
              if (/^-?[0-9]+$/.test(av_value)) {
                const delta = parseInt(av_value, 10);
                c.setMaxAge(delta);
              }
            }
            break;
          case "domain":
            if (av_value) {
              const domain = av_value.trim().replace(/^\./, "");
              if (domain) {
                c.domain = domain.toLowerCase();
              }
            }
            break;
          case "path":
            c.path = av_value && av_value[0] === "/" ? av_value : null;
            break;
          case "secure":
            c.secure = true;
            break;
          case "httponly":
            c.httpOnly = true;
            break;
          case "samesite":
            switch (av_value ? av_value.toLowerCase() : "") {
              case "strict":
                c.sameSite = "strict";
                break;
              case "lax":
                c.sameSite = "lax";
                break;
              case "none":
                c.sameSite = "none";
                break;
              default:
                c.sameSite = void 0;
                break;
            }
            break;
          default:
            c.extensions = c.extensions || [];
            c.extensions.push(av);
            break;
        }
      }
      return c;
    }
    function fromJSON(str) {
      if (!str || validators.isEmptyString(str)) {
        return void 0;
      }
      let obj;
      if (typeof str === "string") {
        try {
          obj = JSON.parse(str);
        } catch {
          return void 0;
        }
      } else {
        obj = str;
      }
      const c = new Cookie3();
      Cookie3.serializableProperties.forEach((prop) => {
        if (obj && typeof obj === "object" && (0, utils_1.inOperator)(prop, obj)) {
          const val = obj[prop];
          if (val === void 0) {
            return;
          }
          if ((0, utils_1.inOperator)(prop, cookieDefaults) && val === cookieDefaults[prop]) {
            return;
          }
          switch (prop) {
            case "key":
            case "value":
            case "sameSite":
              if (typeof val === "string") {
                c[prop] = val;
              }
              break;
            case "expires":
            case "creation":
            case "lastAccessed":
              if (typeof val === "number" || typeof val === "string" || val instanceof Date) {
                c[prop] = obj[prop] == "Infinity" ? "Infinity" : new Date(val);
              } else if (val === null) {
                c[prop] = null;
              }
              break;
            case "maxAge":
              if (typeof val === "number" || val === "Infinity" || val === "-Infinity") {
                c[prop] = val;
              }
              break;
            case "domain":
            case "path":
              if (typeof val === "string" || val === null) {
                c[prop] = val;
              }
              break;
            case "secure":
            case "httpOnly":
              if (typeof val === "boolean") {
                c[prop] = val;
              }
              break;
            case "extensions":
              if (Array.isArray(val) && val.every((item) => typeof item === "string")) {
                c[prop] = val;
              }
              break;
            case "hostOnly":
            case "pathIsDefault":
              if (typeof val === "boolean" || val === null) {
                c[prop] = val;
              }
              break;
          }
        }
      });
      return c;
    }
    var cookieDefaults = {
      // the order in which the RFC has them:
      key: "",
      value: "",
      expires: "Infinity",
      maxAge: null,
      domain: null,
      path: null,
      secure: false,
      httpOnly: false,
      extensions: null,
      // set by the CookieJar:
      hostOnly: null,
      pathIsDefault: null,
      creation: null,
      lastAccessed: null,
      sameSite: void 0
    };
    var Cookie3 = class _Cookie {
      /**
       * Create a new Cookie instance.
       * @public
       * @param options - The attributes to set on the cookie
       */
      constructor(options2 = {}) {
        this.key = options2.key ?? cookieDefaults.key;
        this.value = options2.value ?? cookieDefaults.value;
        this.expires = options2.expires ?? cookieDefaults.expires;
        this.maxAge = options2.maxAge ?? cookieDefaults.maxAge;
        this.domain = options2.domain ?? cookieDefaults.domain;
        this.path = options2.path ?? cookieDefaults.path;
        this.secure = options2.secure ?? cookieDefaults.secure;
        this.httpOnly = options2.httpOnly ?? cookieDefaults.httpOnly;
        this.extensions = options2.extensions ?? cookieDefaults.extensions;
        this.creation = options2.creation ?? cookieDefaults.creation;
        this.hostOnly = options2.hostOnly ?? cookieDefaults.hostOnly;
        this.pathIsDefault = options2.pathIsDefault ?? cookieDefaults.pathIsDefault;
        this.lastAccessed = options2.lastAccessed ?? cookieDefaults.lastAccessed;
        this.sameSite = options2.sameSite ?? cookieDefaults.sameSite;
        this.creation = options2.creation ?? /* @__PURE__ */ new Date();
        Object.defineProperty(this, "creationIndex", {
          configurable: false,
          enumerable: false,
          // important for assert.deepEqual checks
          writable: true,
          value: ++_Cookie.cookiesCreated
        });
        this.creationIndex = _Cookie.cookiesCreated;
      }
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
        const now = Date.now();
        const hostOnly = this.hostOnly != null ? this.hostOnly.toString() : "?";
        const createAge = this.creation && this.creation !== "Infinity" ? `${String(now - this.creation.getTime())}ms` : "?";
        const accessAge = this.lastAccessed && this.lastAccessed !== "Infinity" ? `${String(now - this.lastAccessed.getTime())}ms` : "?";
        return `Cookie="${this.toString()}; hostOnly=${hostOnly}; aAge=${accessAge}; cAge=${createAge}"`;
      }
      /**
       * For convenience in using `JSON.stringify(cookie)`. Returns a plain-old Object that can be JSON-serialized.
       *
       * @remarks
       * - Any `Date` properties (such as {@link Cookie.expires}, {@link Cookie.creation}, and {@link Cookie.lastAccessed}) are exported in ISO format (`Date.toISOString()`).
       *
       *  - Custom Cookie properties are discarded. In tough-cookie 1.x, since there was no {@link Cookie.toJSON} method explicitly defined, all enumerable properties were captured.
       *      If you want a property to be serialized, add the property name to {@link Cookie.serializableProperties}.
       */
      toJSON() {
        const obj = {};
        for (const prop of _Cookie.serializableProperties) {
          const val = this[prop];
          if (val === cookieDefaults[prop]) {
            continue;
          }
          switch (prop) {
            case "key":
            case "value":
            case "sameSite":
              if (typeof val === "string") {
                obj[prop] = val;
              }
              break;
            case "expires":
            case "creation":
            case "lastAccessed":
              if (typeof val === "number" || typeof val === "string" || val instanceof Date) {
                obj[prop] = val == "Infinity" ? "Infinity" : new Date(val).toISOString();
              } else if (val === null) {
                obj[prop] = null;
              }
              break;
            case "maxAge":
              if (typeof val === "number" || val === "Infinity" || val === "-Infinity") {
                obj[prop] = val;
              }
              break;
            case "domain":
            case "path":
              if (typeof val === "string" || val === null) {
                obj[prop] = val;
              }
              break;
            case "secure":
            case "httpOnly":
              if (typeof val === "boolean") {
                obj[prop] = val;
              }
              break;
            case "extensions":
              if (Array.isArray(val)) {
                obj[prop] = val;
              }
              break;
            case "hostOnly":
            case "pathIsDefault":
              if (typeof val === "boolean" || val === null) {
                obj[prop] = val;
              }
              break;
          }
        }
        return obj;
      }
      /**
       * Does a deep clone of this cookie, implemented exactly as `Cookie.fromJSON(cookie.toJSON())`.
       * @public
       */
      clone() {
        return fromJSON(this.toJSON());
      }
      /**
       * Validates cookie attributes for semantic correctness. Useful for "lint" checking any `Set-Cookie` headers you generate.
       * For now, it returns a boolean, but eventually could return a reason string.
       *
       * @remarks
       * Works for a few things, but is by no means comprehensive.
       *
       * @beta
       */
      validate() {
        if (!this.value || !COOKIE_OCTETS.test(this.value)) {
          return false;
        }
        if (this.expires != "Infinity" && !(this.expires instanceof Date) && !(0, parseDate_1.parseDate)(this.expires)) {
          return false;
        }
        if (this.maxAge != null && this.maxAge !== "Infinity" && (this.maxAge === "-Infinity" || this.maxAge <= 0)) {
          return false;
        }
        if (this.path != null && !PATH_VALUE.test(this.path)) {
          return false;
        }
        const cdomain = this.cdomain();
        if (cdomain) {
          if (cdomain.match(/\.$/)) {
            return false;
          }
          const suffix = (0, getPublicSuffix_1.getPublicSuffix)(cdomain);
          if (suffix == null) {
            return false;
          }
        }
        return true;
      }
      /**
       * Sets the 'Expires' attribute on a cookie.
       *
       * @remarks
       * When given a `string` value it will be parsed with {@link parseDate}. If the value can't be parsed as a cookie date
       * then the 'Expires' attribute will be set to `"Infinity"`.
       *
       * @param exp - the new value for the 'Expires' attribute of the cookie.
       */
      setExpires(exp) {
        if (exp instanceof Date) {
          this.expires = exp;
        } else {
          this.expires = (0, parseDate_1.parseDate)(exp) || "Infinity";
        }
      }
      /**
       * Sets the 'Max-Age' attribute (in seconds) on a cookie.
       *
       * @remarks
       * Coerces `-Infinity` to `"-Infinity"` and `Infinity` to `"Infinity"` so it can be serialized to JSON.
       *
       * @param age - the new value for the 'Max-Age' attribute (in seconds).
       */
      setMaxAge(age) {
        if (age === Infinity) {
          this.maxAge = "Infinity";
        } else if (age === -Infinity) {
          this.maxAge = "-Infinity";
        } else {
          this.maxAge = age;
        }
      }
      /**
       * Encodes to a `Cookie` header value (specifically, the {@link Cookie.key} and {@link Cookie.value} properties joined with "=").
       * @public
       */
      cookieString() {
        const val = this.value || "";
        if (this.key) {
          return `${this.key}=${val}`;
        }
        return val;
      }
      /**
       * Encodes to a `Set-Cookie header` value.
       * @public
       */
      toString() {
        let str = this.cookieString();
        if (this.expires != "Infinity") {
          if (this.expires instanceof Date) {
            str += `; Expires=${(0, formatDate_1.formatDate)(this.expires)}`;
          }
        }
        if (this.maxAge != null && this.maxAge != Infinity) {
          str += `; Max-Age=${String(this.maxAge)}`;
        }
        if (this.domain && !this.hostOnly) {
          str += `; Domain=${this.domain}`;
        }
        if (this.path) {
          str += `; Path=${this.path}`;
        }
        if (this.secure) {
          str += "; Secure";
        }
        if (this.httpOnly) {
          str += "; HttpOnly";
        }
        if (this.sameSite && this.sameSite !== "none") {
          if (this.sameSite.toLowerCase() === _Cookie.sameSiteCanonical.lax.toLowerCase()) {
            str += `; SameSite=${_Cookie.sameSiteCanonical.lax}`;
          } else if (this.sameSite.toLowerCase() === _Cookie.sameSiteCanonical.strict.toLowerCase()) {
            str += `; SameSite=${_Cookie.sameSiteCanonical.strict}`;
          } else {
            str += `; SameSite=${this.sameSite}`;
          }
        }
        if (this.extensions) {
          this.extensions.forEach((ext) => {
            str += `; ${ext}`;
          });
        }
        return str;
      }
      /**
       * Computes the TTL relative to now (milliseconds).
       *
       * @remarks
       * - `Infinity` is returned for cookies without an explicit expiry
       *
       * - `0` is returned if the cookie is expired.
       *
       * - Otherwise a time-to-live in milliseconds is returned.
       *
       * @param now - passing an explicit value is mostly used for testing purposes since this defaults to the `Date.now()`
       * @public
       */
      TTL(now = Date.now()) {
        if (this.maxAge != null && typeof this.maxAge === "number") {
          return this.maxAge <= 0 ? 0 : this.maxAge * 1e3;
        }
        const expires = this.expires;
        if (expires === "Infinity") {
          return Infinity;
        }
        return (expires?.getTime() ?? now) - (now || Date.now());
      }
      /**
       * Computes the absolute unix-epoch milliseconds that this cookie expires.
       *
       * The "Max-Age" attribute takes precedence over "Expires" (as per the RFC). The {@link Cookie.lastAccessed} attribute
       * (or the `now` parameter if given) is used to offset the {@link Cookie.maxAge} attribute.
       *
       * If Expires ({@link Cookie.expires}) is set, that's returned.
       *
       * @param now - can be used to provide a time offset (instead of {@link Cookie.lastAccessed}) to use when calculating the "Max-Age" value
       */
      expiryTime(now) {
        if (this.maxAge != null) {
          const relativeTo = now || this.lastAccessed || /* @__PURE__ */ new Date();
          const maxAge = typeof this.maxAge === "number" ? this.maxAge : -Infinity;
          const age = maxAge <= 0 ? -Infinity : maxAge * 1e3;
          if (relativeTo === "Infinity") {
            return Infinity;
          }
          return relativeTo.getTime() + age;
        }
        if (this.expires == "Infinity") {
          return Infinity;
        }
        return this.expires ? this.expires.getTime() : void 0;
      }
      /**
       * Similar to {@link Cookie.expiryTime}, computes the absolute unix-epoch milliseconds that this cookie expires and returns it as a Date.
       *
       * The "Max-Age" attribute takes precedence over "Expires" (as per the RFC). The {@link Cookie.lastAccessed} attribute
       * (or the `now` parameter if given) is used to offset the {@link Cookie.maxAge} attribute.
       *
       * If Expires ({@link Cookie.expires}) is set, that's returned.
       *
       * @param now - can be used to provide a time offset (instead of {@link Cookie.lastAccessed}) to use when calculating the "Max-Age" value
       */
      expiryDate(now) {
        const millisec = this.expiryTime(now);
        if (millisec == Infinity) {
          return /* @__PURE__ */ new Date(2147483647e3);
        } else if (millisec == -Infinity) {
          return /* @__PURE__ */ new Date(0);
        } else {
          return millisec == void 0 ? void 0 : new Date(millisec);
        }
      }
      /**
       * Indicates if the cookie has been persisted to a store or not.
       * @public
       */
      isPersistent() {
        return this.maxAge != null || this.expires != "Infinity";
      }
      /**
       * Calls {@link canonicalDomain} with the {@link Cookie.domain} property.
       * @public
       */
      canonicalizedDomain() {
        return (0, canonicalDomain_1.canonicalDomain)(this.domain);
      }
      /**
       * Alias for {@link Cookie.canonicalizedDomain}
       * @public
       */
      cdomain() {
        return (0, canonicalDomain_1.canonicalDomain)(this.domain);
      }
      /**
       * Parses a string into a Cookie object.
       *
       * @remarks
       * Note: when parsing a `Cookie` header it must be split by ';' before each Cookie string can be parsed.
       *
       * @example
       * ```
       * // parse a `Set-Cookie` header
       * const setCookieHeader = 'a=bcd; Expires=Tue, 18 Oct 2011 07:05:03 GMT'
       * const cookie = Cookie.parse(setCookieHeader)
       * cookie.key === 'a'
       * cookie.value === 'bcd'
       * cookie.expires === new Date(Date.parse('Tue, 18 Oct 2011 07:05:03 GMT'))
       * ```
       *
       * @example
       * ```
       * // parse a `Cookie` header
       * const cookieHeader = 'name=value; name2=value2; name3=value3'
       * const cookies = cookieHeader.split(';').map(Cookie.parse)
       * cookies[0].name === 'name'
       * cookies[0].value === 'value'
       * cookies[1].name === 'name2'
       * cookies[1].value === 'value2'
       * cookies[2].name === 'name3'
       * cookies[2].value === 'value3'
       * ```
       *
       * @param str - The `Set-Cookie` header or a Cookie string to parse.
       * @param options - Configures `strict` or `loose` mode for cookie parsing
       */
      static parse(str, options2) {
        return parse(str, options2);
      }
      /**
       * Does the reverse of {@link Cookie.toJSON}.
       *
       * @remarks
       * Any Date properties (such as .expires, .creation, and .lastAccessed) are parsed via Date.parse, not tough-cookie's parseDate, since ISO timestamps are being handled at this layer.
       *
       * @example
       * ```
       * const json = JSON.stringify({
       *   key: 'alpha',
       *   value: 'beta',
       *   domain: 'example.com',
       *   path: '/foo',
       *   expires: '2038-01-19T03:14:07.000Z',
       * })
       * const cookie = Cookie.fromJSON(json)
       * cookie.key === 'alpha'
       * cookie.value === 'beta'
       * cookie.domain === 'example.com'
       * cookie.path === '/foo'
       * cookie.expires === new Date(Date.parse('2038-01-19T03:14:07.000Z'))
       * ```
       *
       * @param str - An unparsed JSON string or a value that has already been parsed as JSON
       */
      static fromJSON(str) {
        return fromJSON(str);
      }
    };
    exports2.Cookie = Cookie3;
    Cookie3.cookiesCreated = 0;
    Cookie3.sameSiteLevel = {
      strict: 3,
      lax: 2,
      none: 1
    };
    Cookie3.sameSiteCanonical = {
      strict: "Strict",
      lax: "Lax"
    };
    Cookie3.serializableProperties = [
      "key",
      "value",
      "expires",
      "maxAge",
      "domain",
      "path",
      "secure",
      "httpOnly",
      "extensions",
      "hostOnly",
      "pathIsDefault",
      "creation",
      "lastAccessed",
      "sameSite"
    ];
  }
});

// node_modules/tough-cookie/dist/cookie/cookieCompare.js
var require_cookieCompare = __commonJS({
  "node_modules/tough-cookie/dist/cookie/cookieCompare.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.cookieCompare = cookieCompare;
    var MAX_TIME = 2147483647e3;
    function cookieCompare(a, b) {
      let cmp;
      const aPathLen = a.path ? a.path.length : 0;
      const bPathLen = b.path ? b.path.length : 0;
      cmp = bPathLen - aPathLen;
      if (cmp !== 0) {
        return cmp;
      }
      const aTime = a.creation && a.creation instanceof Date ? a.creation.getTime() : MAX_TIME;
      const bTime = b.creation && b.creation instanceof Date ? b.creation.getTime() : MAX_TIME;
      cmp = aTime - bTime;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = (a.creationIndex || 0) - (b.creationIndex || 0);
      return cmp;
    }
  }
});

// node_modules/tough-cookie/dist/cookie/defaultPath.js
var require_defaultPath = __commonJS({
  "node_modules/tough-cookie/dist/cookie/defaultPath.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultPath = defaultPath;
    function defaultPath(path) {
      if (!path || path.slice(0, 1) !== "/") {
        return "/";
      }
      if (path === "/") {
        return path;
      }
      const rightSlash = path.lastIndexOf("/");
      if (rightSlash === 0) {
        return "/";
      }
      return path.slice(0, rightSlash);
    }
  }
});

// node_modules/tough-cookie/dist/cookie/domainMatch.js
var require_domainMatch = __commonJS({
  "node_modules/tough-cookie/dist/cookie/domainMatch.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.domainMatch = domainMatch;
    var canonicalDomain_1 = require_canonicalDomain();
    var IP_REGEX_LOWERCASE = /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-f\d]{1,4}:){7}(?:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,2}|:)|(?:[a-f\d]{1,4}:){4}(?:(?::[a-f\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,3}|:)|(?:[a-f\d]{1,4}:){3}(?:(?::[a-f\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,4}|:)|(?:[a-f\d]{1,4}:){2}(?:(?::[a-f\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,5}|:)|(?:[a-f\d]{1,4}:){1}(?:(?::[a-f\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,6}|:)|(?::(?:(?::[a-f\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,7}|:)))$)/;
    function domainMatch(domain, cookieDomain, canonicalize) {
      if (domain == null || cookieDomain == null) {
        return void 0;
      }
      let _str;
      let _domStr;
      if (canonicalize !== false) {
        _str = (0, canonicalDomain_1.canonicalDomain)(domain);
        _domStr = (0, canonicalDomain_1.canonicalDomain)(cookieDomain);
      } else {
        _str = domain;
        _domStr = cookieDomain;
      }
      if (_str == null || _domStr == null) {
        return void 0;
      }
      if (_str == _domStr) {
        return true;
      }
      const idx = _str.lastIndexOf(_domStr);
      if (idx <= 0) {
        return false;
      }
      if (_str.length !== _domStr.length + idx) {
        return false;
      }
      if (_str.substring(idx - 1, idx) !== ".") {
        return false;
      }
      return !IP_REGEX_LOWERCASE.test(_str);
    }
  }
});

// node_modules/tough-cookie/dist/cookie/cookieJar.js
var require_cookieJar = __commonJS({
  "node_modules/tough-cookie/dist/cookie/cookieJar.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CookieJar = void 0;
    var getPublicSuffix_1 = require_getPublicSuffix();
    var validators = __importStar(require_validators());
    var validators_1 = require_validators();
    var store_1 = require_store();
    var memstore_1 = require_memstore();
    var pathMatch_1 = require_pathMatch();
    var cookie_1 = require_cookie();
    var utils_1 = require_utils();
    var canonicalDomain_1 = require_canonicalDomain();
    var constants_1 = require_constants();
    var defaultPath_1 = require_defaultPath();
    var domainMatch_1 = require_domainMatch();
    var cookieCompare_1 = require_cookieCompare();
    var version_1 = require_version();
    var defaultSetCookieOptions = {
      loose: false,
      sameSiteContext: void 0,
      ignoreError: false,
      http: true
    };
    var defaultGetCookieOptions = {
      http: true,
      expire: true,
      allPaths: false,
      sameSiteContext: void 0,
      sort: void 0
    };
    var SAME_SITE_CONTEXT_VAL_ERR = 'Invalid sameSiteContext option for getCookies(); expected one of "strict", "lax", or "none"';
    function getCookieContext(url) {
      if (url && typeof url === "object" && "hostname" in url && typeof url.hostname === "string" && "pathname" in url && typeof url.pathname === "string" && "protocol" in url && typeof url.protocol === "string") {
        return {
          hostname: url.hostname,
          pathname: url.pathname,
          protocol: url.protocol
        };
      } else if (typeof url === "string") {
        try {
          return new URL(decodeURI(url));
        } catch {
          return new URL(url);
        }
      } else {
        throw new validators_1.ParameterError("`url` argument is not a string or URL.");
      }
    }
    function checkSameSiteContext(value) {
      const context = String(value).toLowerCase();
      if (context === "none" || context === "lax" || context === "strict") {
        return context;
      } else {
        return void 0;
      }
    }
    function isSecurePrefixConditionMet(cookie) {
      const startsWithSecurePrefix = typeof cookie.key === "string" && cookie.key.startsWith("__Secure-");
      return !startsWithSecurePrefix || cookie.secure;
    }
    function isHostPrefixConditionMet(cookie) {
      const startsWithHostPrefix = typeof cookie.key === "string" && cookie.key.startsWith("__Host-");
      return !startsWithHostPrefix || Boolean(cookie.secure && cookie.hostOnly && cookie.path != null && cookie.path === "/");
    }
    function getNormalizedPrefixSecurity(prefixSecurity) {
      const normalizedPrefixSecurity = prefixSecurity.toLowerCase();
      switch (normalizedPrefixSecurity) {
        case constants_1.PrefixSecurityEnum.STRICT:
        case constants_1.PrefixSecurityEnum.SILENT:
        case constants_1.PrefixSecurityEnum.DISABLED:
          return normalizedPrefixSecurity;
        default:
          return constants_1.PrefixSecurityEnum.SILENT;
      }
    }
    var CookieJar2 = class _CookieJar {
      /**
       * Creates a new `CookieJar` instance.
       *
       * @remarks
       * - If a custom store is not passed to the constructor, an in-memory store ({@link MemoryCookieStore} will be created and used.
       * - If a boolean value is passed as the `options` parameter, this is equivalent to passing `{ rejectPublicSuffixes: <value> }`
       *
       * @param store - a custom {@link Store} implementation (defaults to {@link MemoryCookieStore})
       * @param options - configures how cookies are processed by the cookie jar
       */
      constructor(store, options2) {
        if (typeof options2 === "boolean") {
          options2 = { rejectPublicSuffixes: options2 };
        }
        this.rejectPublicSuffixes = options2?.rejectPublicSuffixes ?? true;
        this.enableLooseMode = options2?.looseMode ?? false;
        this.allowSpecialUseDomain = options2?.allowSpecialUseDomain ?? true;
        this.prefixSecurity = getNormalizedPrefixSecurity(options2?.prefixSecurity ?? "silent");
        this.store = store ?? new memstore_1.MemoryCookieStore();
      }
      callSync(fn) {
        if (!this.store.synchronous) {
          throw new Error("CookieJar store is not synchronous; use async API instead.");
        }
        let syncErr = null;
        let syncResult = void 0;
        try {
          fn.call(this, (error, result) => {
            syncErr = error;
            syncResult = result;
          });
        } catch (err) {
          syncErr = err;
        }
        if (syncErr)
          throw syncErr;
        return syncResult;
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      setCookie(cookie, url, options2, callback) {
        if (typeof options2 === "function") {
          callback = options2;
          options2 = void 0;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        let context;
        try {
          if (typeof url === "string") {
            validators.validate(validators.isNonEmptyString(url), callback, (0, utils_1.safeToString)(options2));
          }
          context = getCookieContext(url);
          if (typeof url === "function") {
            return promiseCallback.reject(new Error("No URL was specified"));
          }
          if (typeof options2 === "function") {
            options2 = defaultSetCookieOptions;
          }
          validators.validate(typeof cb === "function", cb);
          if (!validators.isNonEmptyString(cookie) && !validators.isObject(cookie) && cookie instanceof String && cookie.length == 0) {
            return promiseCallback.resolve(void 0);
          }
        } catch (err) {
          return promiseCallback.reject(err);
        }
        const host = (0, canonicalDomain_1.canonicalDomain)(context.hostname) ?? null;
        const loose = options2?.loose || this.enableLooseMode;
        let sameSiteContext = null;
        if (options2?.sameSiteContext) {
          sameSiteContext = checkSameSiteContext(options2.sameSiteContext);
          if (!sameSiteContext) {
            return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
          }
        }
        if (typeof cookie === "string" || cookie instanceof String) {
          const parsedCookie = cookie_1.Cookie.parse(cookie.toString(), { loose });
          if (!parsedCookie) {
            const err = new Error("Cookie failed to parse");
            return options2?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
          }
          cookie = parsedCookie;
        } else if (!(cookie instanceof cookie_1.Cookie)) {
          const err = new Error("First argument to setCookie must be a Cookie object or string");
          return options2?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
        }
        const now = options2?.now || /* @__PURE__ */ new Date();
        if (this.rejectPublicSuffixes && cookie.domain) {
          try {
            const cdomain = cookie.cdomain();
            const suffix = typeof cdomain === "string" ? (0, getPublicSuffix_1.getPublicSuffix)(cdomain, {
              allowSpecialUseDomain: this.allowSpecialUseDomain,
              ignoreError: options2?.ignoreError
            }) : null;
            if (suffix == null && !constants_1.IP_V6_REGEX_OBJECT.test(cookie.domain)) {
              const err = new Error("Cookie has domain set to a public suffix");
              return options2?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
            }
          } catch (err) {
            return options2?.ignoreError ? promiseCallback.resolve(void 0) : (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              promiseCallback.reject(err)
            );
          }
        }
        if (cookie.domain) {
          if (!(0, domainMatch_1.domainMatch)(host ?? void 0, cookie.cdomain() ?? void 0, false)) {
            const err = new Error(`Cookie not in this host's domain. Cookie:${cookie.cdomain() ?? "null"} Request:${host ?? "null"}`);
            return options2?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
          }
          if (cookie.hostOnly == null) {
            cookie.hostOnly = false;
          }
        } else {
          cookie.hostOnly = true;
          cookie.domain = host;
        }
        if (!cookie.path || cookie.path[0] !== "/") {
          cookie.path = (0, defaultPath_1.defaultPath)(context.pathname);
          cookie.pathIsDefault = true;
        }
        if (options2?.http === false && cookie.httpOnly) {
          const err = new Error("Cookie is HttpOnly and this isn't an HTTP API");
          return options2.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
        }
        if (cookie.sameSite !== "none" && cookie.sameSite !== void 0 && sameSiteContext) {
          if (sameSiteContext === "none") {
            const err = new Error("Cookie is SameSite but this is a cross-origin request");
            return options2?.ignoreError ? promiseCallback.resolve(void 0) : promiseCallback.reject(err);
          }
        }
        const ignoreErrorForPrefixSecurity = this.prefixSecurity === constants_1.PrefixSecurityEnum.SILENT;
        const prefixSecurityDisabled = this.prefixSecurity === constants_1.PrefixSecurityEnum.DISABLED;
        if (!prefixSecurityDisabled) {
          let errorFound = false;
          let errorMsg;
          if (!isSecurePrefixConditionMet(cookie)) {
            errorFound = true;
            errorMsg = "Cookie has __Secure prefix but Secure attribute is not set";
          } else if (!isHostPrefixConditionMet(cookie)) {
            errorFound = true;
            errorMsg = "Cookie has __Host prefix but either Secure or HostOnly attribute is not set or Path is not '/'";
          }
          if (errorFound) {
            return options2?.ignoreError || ignoreErrorForPrefixSecurity ? promiseCallback.resolve(void 0) : promiseCallback.reject(new Error(errorMsg));
          }
        }
        const store = this.store;
        if (!store.updateCookie) {
          store.updateCookie = async function(_oldCookie, newCookie, cb2) {
            return this.putCookie(newCookie).then(() => cb2?.(null), (error) => cb2?.(error));
          };
        }
        const withCookie = function withCookie2(err, oldCookie) {
          if (err) {
            cb(err);
            return;
          }
          const next = function(err2) {
            if (err2) {
              cb(err2);
            } else if (typeof cookie === "string") {
              cb(null, void 0);
            } else {
              cb(null, cookie);
            }
          };
          if (oldCookie) {
            if (options2 && "http" in options2 && options2.http === false && oldCookie.httpOnly) {
              err = new Error("old Cookie is HttpOnly and this isn't an HTTP API");
              if (options2.ignoreError)
                cb(null, void 0);
              else
                cb(err);
              return;
            }
            if (cookie instanceof cookie_1.Cookie) {
              cookie.creation = oldCookie.creation;
              cookie.creationIndex = oldCookie.creationIndex;
              cookie.lastAccessed = now;
              store.updateCookie(oldCookie, cookie, next);
            }
          } else {
            if (cookie instanceof cookie_1.Cookie) {
              cookie.creation = cookie.lastAccessed = now;
              store.putCookie(cookie, next);
            }
          }
        };
        store.findCookie(cookie.domain, cookie.path, cookie.key, withCookie);
        return promiseCallback.promise;
      }
      /**
       * Synchronously attempt to set the {@link Cookie} in the {@link CookieJar}.
       *
       * <strong>Note:</strong> Only works if the configured {@link Store} is also synchronous.
       *
       * @remarks
       * - If successfully persisted, the {@link Cookie} will have updated
       *     {@link Cookie.creation}, {@link Cookie.lastAccessed} and {@link Cookie.hostOnly}
       *     properties.
       *
       * - As per the RFC, the {@link Cookie.hostOnly} flag is set if there was no `Domain={value}`
       *     atttribute on the cookie string. The {@link Cookie.domain} property is set to the
       *     fully-qualified hostname of `currentUrl` in this case. Matching this cookie requires an
       *     exact hostname match (not a {@link domainMatch} as per usual)
       *
       * @param cookie - The cookie object or cookie string to store. A string value will be parsed into a cookie using {@link Cookie.parse}.
       * @param url - The domain to store the cookie with.
       * @param options - Configuration settings to use when storing the cookie.
       * @public
       */
      setCookieSync(cookie, url, options2) {
        const setCookieFn = options2 ? this.setCookie.bind(this, cookie, url, options2) : this.setCookie.bind(this, cookie, url);
        return this.callSync(setCookieFn);
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      getCookies(url, options2, callback) {
        if (typeof options2 === "function") {
          callback = options2;
          options2 = defaultGetCookieOptions;
        } else if (options2 === void 0) {
          options2 = defaultGetCookieOptions;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        let context;
        try {
          if (typeof url === "string") {
            validators.validate(validators.isNonEmptyString(url), cb, url);
          }
          context = getCookieContext(url);
          validators.validate(validators.isObject(options2), cb, (0, utils_1.safeToString)(options2));
          validators.validate(typeof cb === "function", cb);
        } catch (parameterError) {
          return promiseCallback.reject(parameterError);
        }
        const host = (0, canonicalDomain_1.canonicalDomain)(context.hostname);
        const path = context.pathname || "/";
        const secure = context.protocol && (context.protocol == "https:" || context.protocol == "wss:");
        let sameSiteLevel = 0;
        if (options2.sameSiteContext) {
          const sameSiteContext = checkSameSiteContext(options2.sameSiteContext);
          if (sameSiteContext == null) {
            return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
          }
          sameSiteLevel = cookie_1.Cookie.sameSiteLevel[sameSiteContext];
          if (!sameSiteLevel) {
            return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
          }
        }
        const http = options2.http ?? true;
        const now = Date.now();
        const expireCheck = options2.expire ?? true;
        const allPaths = options2.allPaths ?? false;
        const store = this.store;
        function matchingCookie(c) {
          if (c.hostOnly) {
            if (c.domain != host) {
              return false;
            }
          } else {
            if (!(0, domainMatch_1.domainMatch)(host ?? void 0, c.domain ?? void 0, false)) {
              return false;
            }
          }
          if (!allPaths && typeof c.path === "string" && !(0, pathMatch_1.pathMatch)(path, c.path)) {
            return false;
          }
          if (c.secure && !secure) {
            return false;
          }
          if (c.httpOnly && !http) {
            return false;
          }
          if (sameSiteLevel) {
            let cookieLevel;
            if (c.sameSite === "lax") {
              cookieLevel = cookie_1.Cookie.sameSiteLevel.lax;
            } else if (c.sameSite === "strict") {
              cookieLevel = cookie_1.Cookie.sameSiteLevel.strict;
            } else {
              cookieLevel = cookie_1.Cookie.sameSiteLevel.none;
            }
            if (cookieLevel > sameSiteLevel) {
              return false;
            }
          }
          const expiryTime = c.expiryTime();
          if (expireCheck && expiryTime != void 0 && expiryTime <= now) {
            store.removeCookie(c.domain, c.path, c.key, () => {
            });
            return false;
          }
          return true;
        }
        store.findCookies(host, allPaths ? null : path, this.allowSpecialUseDomain, (err, cookies) => {
          if (err) {
            cb(err);
            return;
          }
          if (cookies == null) {
            cb(null, []);
            return;
          }
          cookies = cookies.filter(matchingCookie);
          if ("sort" in options2 && options2.sort !== false) {
            cookies = cookies.sort(cookieCompare_1.cookieCompare);
          }
          const now2 = /* @__PURE__ */ new Date();
          for (const cookie of cookies) {
            cookie.lastAccessed = now2;
          }
          cb(null, cookies);
        });
        return promiseCallback.promise;
      }
      /**
       * Synchronously retrieve the list of cookies that can be sent in a Cookie header for the
       * current URL.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       *
       * @remarks
       * - The array of cookies returned will be sorted according to {@link cookieCompare}.
       *
       * - The {@link Cookie.lastAccessed} property will be updated on all returned cookies.
       *
       * @param url - The domain to store the cookie with.
       * @param options - Configuration settings to use when retrieving the cookies.
       */
      getCookiesSync(url, options2) {
        return this.callSync(this.getCookies.bind(this, url, options2)) ?? [];
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      getCookieString(url, options2, callback) {
        if (typeof options2 === "function") {
          callback = options2;
          options2 = void 0;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const next = function(err, cookies) {
          if (err) {
            promiseCallback.callback(err);
          } else {
            promiseCallback.callback(null, cookies?.sort(cookieCompare_1.cookieCompare).map((c) => c.cookieString()).join("; "));
          }
        };
        this.getCookies(url, options2, next);
        return promiseCallback.promise;
      }
      /**
       * Synchronous version of `.getCookieString()`. Accepts the same options as `.getCookies()` but returns a string suitable for a
       * `Cookie` header rather than an Array.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       *
       * @param url - The domain to store the cookie with.
       * @param options - Configuration settings to use when retrieving the cookies.
       */
      getCookieStringSync(url, options2) {
        return this.callSync(options2 ? this.getCookieString.bind(this, url, options2) : this.getCookieString.bind(this, url)) ?? "";
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      getSetCookieStrings(url, options2, callback) {
        if (typeof options2 === "function") {
          callback = options2;
          options2 = void 0;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const next = function(err, cookies) {
          if (err) {
            promiseCallback.callback(err);
          } else {
            promiseCallback.callback(null, cookies?.map((c) => {
              return c.toString();
            }));
          }
        };
        this.getCookies(url, options2, next);
        return promiseCallback.promise;
      }
      /**
       * Synchronous version of `.getSetCookieStrings()`. Returns an array of strings suitable for `Set-Cookie` headers.
       * Accepts the same options as `.getCookies()`.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       *
       * @param url - The domain to store the cookie with.
       * @param options - Configuration settings to use when retrieving the cookies.
       */
      getSetCookieStringsSync(url, options2 = {}) {
        return this.callSync(this.getSetCookieStrings.bind(this, url, options2)) ?? [];
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      serialize(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        let type = this.store.constructor.name;
        if (validators.isObject(type)) {
          type = null;
        }
        const serialized = {
          // The version of tough-cookie that serialized this jar. Generally a good
          // practice since future versions can make data import decisions based on
          // known past behavior. When/if this matters, use `semver`.
          version: `tough-cookie@${version_1.version}`,
          // add the store type, to make humans happy:
          storeType: type,
          // CookieJar configuration:
          rejectPublicSuffixes: this.rejectPublicSuffixes,
          enableLooseMode: this.enableLooseMode,
          allowSpecialUseDomain: this.allowSpecialUseDomain,
          prefixSecurity: getNormalizedPrefixSecurity(this.prefixSecurity),
          // this gets filled from getAllCookies:
          cookies: []
        };
        if (typeof this.store.getAllCookies !== "function") {
          return promiseCallback.reject(new Error("store does not support getAllCookies and cannot be serialized"));
        }
        this.store.getAllCookies((err, cookies) => {
          if (err) {
            promiseCallback.callback(err);
            return;
          }
          if (cookies == null) {
            promiseCallback.callback(null, serialized);
            return;
          }
          serialized.cookies = cookies.map((cookie) => {
            const serializedCookie = cookie.toJSON();
            delete serializedCookie.creationIndex;
            return serializedCookie;
          });
          promiseCallback.callback(null, serialized);
        });
        return promiseCallback.promise;
      }
      /**
       * Serialize the CookieJar if the underlying store supports `.getAllCookies`.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       */
      serializeSync() {
        return this.callSync((callback) => {
          this.serialize(callback);
        });
      }
      /**
       * Alias of {@link CookieJar.serializeSync}. Allows the cookie to be serialized
       * with `JSON.stringify(cookieJar)`.
       */
      toJSON() {
        return this.serializeSync();
      }
      /**
       * Use the class method CookieJar.deserialize instead of calling this directly
       * @internal
       */
      _importCookies(serialized, callback) {
        let cookies = void 0;
        if (serialized && typeof serialized === "object" && (0, utils_1.inOperator)("cookies", serialized) && Array.isArray(serialized.cookies)) {
          cookies = serialized.cookies;
        }
        if (!cookies) {
          callback(new Error("serialized jar has no cookies array"), void 0);
          return;
        }
        cookies = cookies.slice();
        const putNext = (err) => {
          if (err) {
            callback(err, void 0);
            return;
          }
          if (Array.isArray(cookies)) {
            if (!cookies.length) {
              callback(err, this);
              return;
            }
            let cookie;
            try {
              cookie = cookie_1.Cookie.fromJSON(cookies.shift());
            } catch (e) {
              callback(e instanceof Error ? e : new Error(), void 0);
              return;
            }
            if (cookie === void 0) {
              putNext(null);
              return;
            }
            this.store.putCookie(cookie, putNext);
          }
        };
        putNext(null);
      }
      /**
       * @internal
       */
      _importCookiesSync(serialized) {
        this.callSync(this._importCookies.bind(this, serialized));
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      clone(newStore, callback) {
        if (typeof newStore === "function") {
          callback = newStore;
          newStore = void 0;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        this.serialize((err, serialized) => {
          if (err) {
            return promiseCallback.reject(err);
          }
          return _CookieJar.deserialize(serialized ?? "", newStore, cb);
        });
        return promiseCallback.promise;
      }
      /**
       * @internal
       */
      _cloneSync(newStore) {
        const cloneFn = newStore && typeof newStore !== "function" ? this.clone.bind(this, newStore) : this.clone.bind(this);
        return this.callSync((callback) => {
          cloneFn(callback);
        });
      }
      /**
       * Produces a deep clone of this CookieJar. Modifications to the original do
       * not affect the clone, and vice versa.
       *
       * <strong>Note</strong>: Only works if both the configured Store and destination
       * Store are synchronous.
       *
       * @remarks
       * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
       *
       * - Transferring between store types is supported so long as the source
       *     implements `.getAllCookies()` and the destination implements `.putCookie()`.
       *
       * @param newStore - The target {@link Store} to clone cookies into.
       */
      cloneSync(newStore) {
        if (!newStore) {
          return this._cloneSync();
        }
        if (!newStore.synchronous) {
          throw new Error("CookieJar clone destination store is not synchronous; use async API instead.");
        }
        return this._cloneSync(newStore);
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      removeAllCookies(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        const store = this.store;
        if (typeof store.removeAllCookies === "function" && store.removeAllCookies !== store_1.Store.prototype.removeAllCookies) {
          store.removeAllCookies(cb);
          return promiseCallback.promise;
        }
        store.getAllCookies((err, cookies) => {
          if (err) {
            cb(err);
            return;
          }
          if (!cookies) {
            cookies = [];
          }
          if (cookies.length === 0) {
            cb(null, void 0);
            return;
          }
          let completedCount = 0;
          const removeErrors = [];
          const removeCookieCb = function removeCookieCb2(removeErr) {
            if (removeErr) {
              removeErrors.push(removeErr);
            }
            completedCount++;
            if (completedCount === cookies.length) {
              if (removeErrors[0])
                cb(removeErrors[0]);
              else
                cb(null, void 0);
              return;
            }
          };
          cookies.forEach((cookie) => {
            store.removeCookie(cookie.domain, cookie.path, cookie.key, removeCookieCb);
          });
        });
        return promiseCallback.promise;
      }
      /**
       * Removes all cookies from the CookieJar.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       *
       * @remarks
       * - This is a new backwards-compatible feature of tough-cookie version 2.5,
       *     so not all Stores will implement it efficiently. For Stores that do not
       *     implement `removeAllCookies`, the fallback is to call `removeCookie` after
       *     `getAllCookies`.
       *
       * - If `getAllCookies` fails or isn't implemented in the Store, an error is returned.
       *
       * - If one or more of the `removeCookie` calls fail, only the first error is returned.
       */
      removeAllCookiesSync() {
        this.callSync((callback) => {
          this.removeAllCookies(callback);
        });
      }
      /**
       * @internal No doc because this is the overload implementation
       */
      static deserialize(strOrObj, store, callback) {
        if (typeof store === "function") {
          callback = store;
          store = void 0;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        let serialized;
        if (typeof strOrObj === "string") {
          try {
            serialized = JSON.parse(strOrObj);
          } catch (e) {
            return promiseCallback.reject(e instanceof Error ? e : new Error());
          }
        } else {
          serialized = strOrObj;
        }
        const readSerializedProperty = (property) => {
          return serialized && typeof serialized === "object" && (0, utils_1.inOperator)(property, serialized) ? serialized[property] : void 0;
        };
        const readSerializedBoolean = (property) => {
          const value = readSerializedProperty(property);
          return typeof value === "boolean" ? value : void 0;
        };
        const readSerializedString = (property) => {
          const value = readSerializedProperty(property);
          return typeof value === "string" ? value : void 0;
        };
        const jar = new _CookieJar(store, {
          rejectPublicSuffixes: readSerializedBoolean("rejectPublicSuffixes"),
          looseMode: readSerializedBoolean("enableLooseMode"),
          allowSpecialUseDomain: readSerializedBoolean("allowSpecialUseDomain"),
          prefixSecurity: getNormalizedPrefixSecurity(readSerializedString("prefixSecurity") ?? "silent")
        });
        jar._importCookies(serialized, (err) => {
          if (err) {
            promiseCallback.callback(err);
            return;
          }
          promiseCallback.callback(null, jar);
        });
        return promiseCallback.promise;
      }
      /**
       * A new CookieJar is created and the serialized {@link Cookie} values are added to
       * the underlying store. Each {@link Cookie} is added via `store.putCookie(...)` in
       * the order in which they appear in the serialization.
       *
       * <strong>Note</strong>: Only works if the configured Store is also synchronous.
       *
       * @remarks
       * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
       *
       * - As a convenience, if `strOrObj` is a string, it is passed through `JSON.parse` first.
       *
       * @param strOrObj - A JSON string or object representing the deserialized cookies.
       * @param store - The underlying store to persist the deserialized cookies into.
       */
      static deserializeSync(strOrObj, store) {
        const serialized = typeof strOrObj === "string" ? JSON.parse(strOrObj) : strOrObj;
        const readSerializedProperty = (property) => {
          return serialized && typeof serialized === "object" && (0, utils_1.inOperator)(property, serialized) ? serialized[property] : void 0;
        };
        const readSerializedBoolean = (property) => {
          const value = readSerializedProperty(property);
          return typeof value === "boolean" ? value : void 0;
        };
        const readSerializedString = (property) => {
          const value = readSerializedProperty(property);
          return typeof value === "string" ? value : void 0;
        };
        const jar = new _CookieJar(store, {
          rejectPublicSuffixes: readSerializedBoolean("rejectPublicSuffixes"),
          looseMode: readSerializedBoolean("enableLooseMode"),
          allowSpecialUseDomain: readSerializedBoolean("allowSpecialUseDomain"),
          prefixSecurity: getNormalizedPrefixSecurity(readSerializedString("prefixSecurity") ?? "silent")
        });
        if (!jar.store.synchronous) {
          throw new Error("CookieJar store is not synchronous; use async API instead.");
        }
        jar._importCookiesSync(serialized);
        return jar;
      }
      /**
       * Alias of {@link CookieJar.deserializeSync}.
       *
       * @remarks
       * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
       *
       * - As a convenience, if `strOrObj` is a string, it is passed through `JSON.parse` first.
       *
       * @param jsonString - A JSON string or object representing the deserialized cookies.
       * @param store - The underlying store to persist the deserialized cookies into.
       */
      static fromJSON(jsonString, store) {
        return _CookieJar.deserializeSync(jsonString, store);
      }
    };
    exports2.CookieJar = CookieJar2;
  }
});

// node_modules/tough-cookie/dist/cookie/permutePath.js
var require_permutePath = __commonJS({
  "node_modules/tough-cookie/dist/cookie/permutePath.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.permutePath = permutePath;
    function permutePath(path) {
      if (path === "/") {
        return ["/"];
      }
      const permutations = [path];
      while (path.length > 1) {
        const lindex = path.lastIndexOf("/");
        if (lindex === 0) {
          break;
        }
        path = path.slice(0, lindex);
        permutations.push(path);
      }
      permutations.push("/");
      return permutations;
    }
  }
});

// node_modules/tough-cookie/dist/cookie/index.js
var require_cookie2 = __commonJS({
  "node_modules/tough-cookie/dist/cookie/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.permutePath = exports2.parseDate = exports2.formatDate = exports2.domainMatch = exports2.defaultPath = exports2.CookieJar = exports2.cookieCompare = exports2.Cookie = exports2.PrefixSecurityEnum = exports2.canonicalDomain = exports2.version = exports2.ParameterError = exports2.Store = exports2.getPublicSuffix = exports2.permuteDomain = exports2.pathMatch = exports2.MemoryCookieStore = void 0;
    exports2.parse = parse;
    exports2.fromJSON = fromJSON;
    var memstore_1 = require_memstore();
    Object.defineProperty(exports2, "MemoryCookieStore", { enumerable: true, get: function() {
      return memstore_1.MemoryCookieStore;
    } });
    var pathMatch_1 = require_pathMatch();
    Object.defineProperty(exports2, "pathMatch", { enumerable: true, get: function() {
      return pathMatch_1.pathMatch;
    } });
    var permuteDomain_1 = require_permuteDomain();
    Object.defineProperty(exports2, "permuteDomain", { enumerable: true, get: function() {
      return permuteDomain_1.permuteDomain;
    } });
    var getPublicSuffix_1 = require_getPublicSuffix();
    Object.defineProperty(exports2, "getPublicSuffix", { enumerable: true, get: function() {
      return getPublicSuffix_1.getPublicSuffix;
    } });
    var store_1 = require_store();
    Object.defineProperty(exports2, "Store", { enumerable: true, get: function() {
      return store_1.Store;
    } });
    var validators_1 = require_validators();
    Object.defineProperty(exports2, "ParameterError", { enumerable: true, get: function() {
      return validators_1.ParameterError;
    } });
    var version_1 = require_version();
    Object.defineProperty(exports2, "version", { enumerable: true, get: function() {
      return version_1.version;
    } });
    var canonicalDomain_1 = require_canonicalDomain();
    Object.defineProperty(exports2, "canonicalDomain", { enumerable: true, get: function() {
      return canonicalDomain_1.canonicalDomain;
    } });
    var constants_1 = require_constants();
    Object.defineProperty(exports2, "PrefixSecurityEnum", { enumerable: true, get: function() {
      return constants_1.PrefixSecurityEnum;
    } });
    var cookie_1 = require_cookie();
    Object.defineProperty(exports2, "Cookie", { enumerable: true, get: function() {
      return cookie_1.Cookie;
    } });
    var cookieCompare_1 = require_cookieCompare();
    Object.defineProperty(exports2, "cookieCompare", { enumerable: true, get: function() {
      return cookieCompare_1.cookieCompare;
    } });
    var cookieJar_1 = require_cookieJar();
    Object.defineProperty(exports2, "CookieJar", { enumerable: true, get: function() {
      return cookieJar_1.CookieJar;
    } });
    var defaultPath_1 = require_defaultPath();
    Object.defineProperty(exports2, "defaultPath", { enumerable: true, get: function() {
      return defaultPath_1.defaultPath;
    } });
    var domainMatch_1 = require_domainMatch();
    Object.defineProperty(exports2, "domainMatch", { enumerable: true, get: function() {
      return domainMatch_1.domainMatch;
    } });
    var formatDate_1 = require_formatDate();
    Object.defineProperty(exports2, "formatDate", { enumerable: true, get: function() {
      return formatDate_1.formatDate;
    } });
    var parseDate_1 = require_parseDate();
    Object.defineProperty(exports2, "parseDate", { enumerable: true, get: function() {
      return parseDate_1.parseDate;
    } });
    var permutePath_1 = require_permutePath();
    Object.defineProperty(exports2, "permutePath", { enumerable: true, get: function() {
      return permutePath_1.permutePath;
    } });
    var cookie_2 = require_cookie();
    function parse(str, options2) {
      return cookie_2.Cookie.parse(str, options2);
    }
    function fromJSON(str) {
      return cookie_2.Cookie.fromJSON(str);
    }
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/errors.js
var require_errors = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/errors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WriteZero = exports2.UnexpectedEof = exports2.TimedOut = exports2.PermissionDenied = exports2.NotFound = exports2.NotConnected = exports2.InvalidData = exports2.Interrupted = exports2.Http = exports2.ConnectionReset = exports2.ConnectionRefused = exports2.ConnectionAborted = exports2.Busy = exports2.BrokenPipe = exports2.BadResource = exports2.AlreadyExists = exports2.AddrNotAvailable = exports2.AddrInUse = void 0;
    var AddrInUse = class extends Error {
    };
    exports2.AddrInUse = AddrInUse;
    var AddrNotAvailable = class extends Error {
    };
    exports2.AddrNotAvailable = AddrNotAvailable;
    var AlreadyExists = class extends Error {
    };
    exports2.AlreadyExists = AlreadyExists;
    var BadResource = class extends Error {
    };
    exports2.BadResource = BadResource;
    var BrokenPipe = class extends Error {
    };
    exports2.BrokenPipe = BrokenPipe;
    var Busy = class extends Error {
    };
    exports2.Busy = Busy;
    var ConnectionAborted = class extends Error {
    };
    exports2.ConnectionAborted = ConnectionAborted;
    var ConnectionRefused = class extends Error {
    };
    exports2.ConnectionRefused = ConnectionRefused;
    var ConnectionReset = class extends Error {
    };
    exports2.ConnectionReset = ConnectionReset;
    var Http = class extends Error {
    };
    exports2.Http = Http;
    var Interrupted = class extends Error {
    };
    exports2.Interrupted = Interrupted;
    var InvalidData = class extends Error {
    };
    exports2.InvalidData = InvalidData;
    var NotConnected = class extends Error {
    };
    exports2.NotConnected = NotConnected;
    var NotFound = class extends Error {
      constructor() {
        super(...arguments);
        this.code = "ENOENT";
      }
    };
    exports2.NotFound = NotFound;
    var PermissionDenied = class extends Error {
    };
    exports2.PermissionDenied = PermissionDenied;
    var TimedOut = class extends Error {
    };
    exports2.TimedOut = TimedOut;
    var UnexpectedEof = class extends Error {
    };
    exports2.UnexpectedEof = UnexpectedEof;
    var WriteZero = class extends Error {
    };
    exports2.WriteZero = WriteZero;
  }
});

// node_modules/@deno/shim-deno/dist/deno/internal/errorMap.js
var require_errorMap = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/internal/errorMap.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors2 = __importStar(require_errors());
    var mapper = (Ctor) => (err) => Object.assign(new Ctor(err.message), {
      stack: err.stack
    });
    var map = {
      EEXIST: mapper(errors2.AlreadyExists),
      ENOENT: mapper(errors2.NotFound),
      EBADF: mapper(errors2.BadResource)
    };
    var isNodeErr = (e) => {
      return e instanceof Error && "code" in e;
    };
    function mapError(e) {
      var _a;
      if (!isNodeErr(e))
        return e;
      return ((_a = map[e.code]) === null || _a === void 0 ? void 0 : _a.call(map, e)) || e;
    }
    exports2.default = mapError;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/stat.js
var require_stat = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/stat.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.stat = exports2.denoifyFileInfo = void 0;
    var promises_1 = require("node:fs/promises");
    var os = __importStar(require("node:os"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var isWindows = os.platform() === "win32";
    function denoifyFileInfo(s) {
      return {
        atime: s.atime,
        birthtime: s.birthtime,
        blksize: isWindows ? null : s.blksize,
        blocks: isWindows ? null : s.blocks,
        dev: s.dev,
        gid: isWindows ? null : s.gid,
        ino: isWindows ? null : s.ino,
        isDirectory: s.isDirectory(),
        isFile: s.isFile(),
        isSymlink: s.isSymbolicLink(),
        isBlockDevice: isWindows ? null : s.isBlockDevice(),
        isCharDevice: isWindows ? null : s.isCharacterDevice(),
        isFifo: isWindows ? null : s.isFIFO(),
        isSocket: isWindows ? null : s.isSocket(),
        mode: isWindows ? null : s.mode,
        mtime: s.mtime,
        nlink: isWindows ? null : s.nlink,
        rdev: isWindows ? null : s.rdev,
        size: s.size,
        uid: isWindows ? null : s.uid
      };
    }
    exports2.denoifyFileInfo = denoifyFileInfo;
    var stat = async (path) => {
      try {
        return denoifyFileInfo(await (0, promises_1.stat)(path));
      } catch (e) {
        throw (0, errorMap_js_1.default)(e);
      }
    };
    exports2.stat = stat;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/fstat.js
var require_fstat = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/fstat.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fstat = void 0;
    var fs = __importStar(require("fs"));
    var util_1 = require("util");
    var stat_js_1 = require_stat();
    var errorMap_js_1 = __importDefault(require_errorMap());
    var nodeFstat = (0, util_1.promisify)(fs.fstat);
    var fstat = async function(fd) {
      try {
        return (0, stat_js_1.denoifyFileInfo)(await nodeFstat(fd));
      } catch (err) {
        throw (0, errorMap_js_1.default)(err);
      }
    };
    exports2.fstat = fstat;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/fstatSync.js
var require_fstatSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/fstatSync.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fstatSync = void 0;
    var fs_1 = require("fs");
    var stat_js_1 = require_stat();
    var errorMap_js_1 = __importDefault(require_errorMap());
    var fstatSync = function fstatSync2(fd) {
      try {
        return (0, stat_js_1.denoifyFileInfo)((0, fs_1.fstatSync)(fd));
      } catch (err) {
        throw (0, errorMap_js_1.default)(err);
      }
    };
    exports2.fstatSync = fstatSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/ftruncate.js
var require_ftruncate = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/ftruncate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ftruncate = void 0;
    var fs_1 = require("fs");
    var util_1 = require("util");
    var _ftruncate = (0, util_1.promisify)(fs_1.ftruncate);
    exports2.ftruncate = _ftruncate;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/ftruncateSync.js
var require_ftruncateSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/ftruncateSync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ftruncateSync = void 0;
    var fs_1 = require("fs");
    exports2.ftruncateSync = fs_1.ftruncateSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/fdatasync.js
var require_fdatasync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/fdatasync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fdatasync = void 0;
    var fs_1 = require("fs");
    var util_1 = require("util");
    var _fdatasync = (0, util_1.promisify)(fs_1.fdatasync);
    exports2.fdatasync = _fdatasync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/fdatasyncSync.js
var require_fdatasyncSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/fdatasyncSync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fdatasyncSync = void 0;
    var fs_1 = require("fs");
    exports2.fdatasyncSync = fs_1.fdatasyncSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/read.js
var require_read = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/read.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.read = void 0;
    var util_1 = require("util");
    var fs_1 = require("fs");
    var _read = (0, util_1.promisify)(fs_1.read);
    var read = async function read2(rid, buffer) {
      if (buffer == null) {
        throw new TypeError("Buffer must not be null.");
      }
      if (buffer.length === 0) {
        return 0;
      }
      const { bytesRead } = await _read(rid, buffer, 0, buffer.length, null);
      return bytesRead === 0 ? null : bytesRead;
    };
    exports2.read = read;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/readSync.js
var require_readSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/readSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readSync = void 0;
    var fs = __importStar(require("fs"));
    var readSync = (fd, buffer) => {
      const bytesRead = fs.readSync(fd, buffer);
      return bytesRead === 0 ? null : bytesRead;
    };
    exports2.readSync = readSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/write.js
var require_write = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/write.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.write = void 0;
    var fs = __importStar(require("fs"));
    var util_1 = require("util");
    var nodeWrite = (0, util_1.promisify)(fs.write);
    var write = async (fd, data) => {
      const { bytesWritten } = await nodeWrite(fd, data);
      return bytesWritten;
    };
    exports2.write = write;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/writeSync.js
var require_writeSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/writeSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.writeSync = void 0;
    var fs = __importStar(require("fs"));
    exports2.writeSync = fs.writeSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/classes/FsFile.js
var require_FsFile = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/classes/FsFile.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _a;
    var _b;
    var _c;
    var _d;
    var _FsFile_closed;
    var _FsFile_readableStream;
    var _FsFile_writableStream;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.File = exports2.FsFile = void 0;
    var fs = __importStar(require("node:fs"));
    var stream = __importStar(require("node:stream"));
    var fstat_js_1 = require_fstat();
    var fstatSync_js_1 = require_fstatSync();
    var ftruncate_js_1 = require_ftruncate();
    var ftruncateSync_js_1 = require_ftruncateSync();
    var fdatasync_js_1 = require_fdatasync();
    var fdatasyncSync_js_1 = require_fdatasyncSync();
    var read_js_1 = require_read();
    var readSync_js_1 = require_readSync();
    var write_js_1 = require_write();
    var writeSync_js_1 = require_writeSync();
    (_a = (_c = Symbol).dispose) !== null && _a !== void 0 ? _a : _c.dispose = /* @__PURE__ */ Symbol("Symbol.dispose");
    (_b = (_d = Symbol).asyncDispose) !== null && _b !== void 0 ? _b : _d.asyncDispose = /* @__PURE__ */ Symbol("Symbol.asyncDispose");
    var FsFile = class {
      constructor(rid) {
        this.rid = rid;
        _FsFile_closed.set(this, false);
        _FsFile_readableStream.set(this, void 0);
        _FsFile_writableStream.set(this, void 0);
      }
      [(_FsFile_closed = /* @__PURE__ */ new WeakMap(), _FsFile_readableStream = /* @__PURE__ */ new WeakMap(), _FsFile_writableStream = /* @__PURE__ */ new WeakMap(), Symbol.dispose)]() {
        if (!__classPrivateFieldGet(this, _FsFile_closed, "f")) {
          this.close();
        }
      }
      async write(p) {
        return await (0, write_js_1.write)(this.rid, p);
      }
      writeSync(p) {
        return (0, writeSync_js_1.writeSync)(this.rid, p);
      }
      async truncate(len) {
        await (0, ftruncate_js_1.ftruncate)(this.rid, len);
      }
      truncateSync(len) {
        return (0, ftruncateSync_js_1.ftruncateSync)(this.rid, len);
      }
      read(p) {
        return (0, read_js_1.read)(this.rid, p);
      }
      readSync(p) {
        return (0, readSync_js_1.readSync)(this.rid, p);
      }
      seek(_offset, _whence) {
        throw new Error("Method not implemented.");
      }
      seekSync(_offset, _whence) {
        throw new Error("Method not implemented.");
      }
      async stat() {
        return await (0, fstat_js_1.fstat)(this.rid);
      }
      statSync() {
        return (0, fstatSync_js_1.fstatSync)(this.rid);
      }
      sync() {
        throw new Error("Method not implemented.");
      }
      syncSync() {
        throw new Error("Method not implemented.");
      }
      syncData() {
        return (0, fdatasync_js_1.fdatasync)(this.rid);
      }
      syncDataSync() {
        return (0, fdatasyncSync_js_1.fdatasyncSync)(this.rid);
      }
      utime(_atime, _mtime) {
        throw new Error("Method not implemented.");
      }
      utimeSync(_atime, _mtime) {
        throw new Error("Method not implemented.");
      }
      close() {
        __classPrivateFieldSet(this, _FsFile_closed, true, "f");
        fs.closeSync(this.rid);
      }
      get readable() {
        if (__classPrivateFieldGet(this, _FsFile_readableStream, "f") == null) {
          const nodeStream = fs.createReadStream(null, {
            fd: this.rid,
            autoClose: false
          });
          __classPrivateFieldSet(this, _FsFile_readableStream, stream.Readable.toWeb(nodeStream), "f");
        }
        return __classPrivateFieldGet(this, _FsFile_readableStream, "f");
      }
      get writable() {
        if (__classPrivateFieldGet(this, _FsFile_writableStream, "f") == null) {
          const nodeStream = fs.createWriteStream(null, {
            fd: this.rid,
            autoClose: false
          });
          __classPrivateFieldSet(this, _FsFile_writableStream, stream.Writable.toWeb(nodeStream), "f");
        }
        return __classPrivateFieldGet(this, _FsFile_writableStream, "f");
      }
    };
    exports2.FsFile = FsFile;
    var File = FsFile;
    exports2.File = File;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/classes/PermissionStatus.js
var require_PermissionStatus = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/classes/PermissionStatus.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    var _c;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PermissionStatus = void 0;
    (_a = (_c = globalThis).EventTarget) !== null && _a !== void 0 ? _a : _c.EventTarget = (_b = require("events").EventTarget) !== null && _b !== void 0 ? _b : null;
    var PermissionStatus = class extends EventTarget {
      /** @internal */
      constructor(state) {
        super();
        this.state = state;
        this.onchange = null;
        this.partial = false;
      }
    };
    exports2.PermissionStatus = PermissionStatus;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/classes/Permissions.js
var require_Permissions = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/classes/Permissions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Permissions = void 0;
    var PermissionStatus_js_1 = require_PermissionStatus();
    var Permissions = class {
      query(desc) {
        return Promise.resolve(this.querySync(desc));
      }
      querySync(_desc) {
        return new PermissionStatus_js_1.PermissionStatus("granted");
      }
      revoke(desc) {
        return Promise.resolve(this.revokeSync(desc));
      }
      revokeSync(_desc) {
        return new PermissionStatus_js_1.PermissionStatus("denied");
      }
      request(desc) {
        return this.query(desc);
      }
      requestSync(desc) {
        return this.querySync(desc);
      }
    };
    exports2.Permissions = Permissions;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/classes.js
var require_classes = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/classes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PermissionStatus = exports2.Permissions = exports2.FsFile = exports2.File = void 0;
    var FsFile_js_1 = require_FsFile();
    Object.defineProperty(exports2, "File", { enumerable: true, get: function() {
      return FsFile_js_1.File;
    } });
    Object.defineProperty(exports2, "FsFile", { enumerable: true, get: function() {
      return FsFile_js_1.FsFile;
    } });
    var Permissions_js_1 = require_Permissions();
    Object.defineProperty(exports2, "Permissions", { enumerable: true, get: function() {
      return Permissions_js_1.Permissions;
    } });
    var PermissionStatus_js_1 = require_PermissionStatus();
    Object.defineProperty(exports2, "PermissionStatus", { enumerable: true, get: function() {
      return PermissionStatus_js_1.PermissionStatus;
    } });
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/enums/SeekMode.js
var require_SeekMode = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/enums/SeekMode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SeekMode = void 0;
    var SeekMode;
    (function(SeekMode2) {
      SeekMode2[SeekMode2["Start"] = 0] = "Start";
      SeekMode2[SeekMode2["Current"] = 1] = "Current";
      SeekMode2[SeekMode2["End"] = 2] = "End";
    })(SeekMode || (exports2.SeekMode = SeekMode = {}));
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/enums.js
var require_enums = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/enums.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SeekMode = void 0;
    var SeekMode_js_1 = require_SeekMode();
    Object.defineProperty(exports2, "SeekMode", { enumerable: true, get: function() {
      return SeekMode_js_1.SeekMode;
    } });
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/build.js
var require_build = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/build.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.build = void 0;
    var os = __importStar(require("os"));
    exports2.build = {
      arch: "x86_64",
      os: /* @__PURE__ */ ((p) => p === "win32" ? "windows" : p === "darwin" ? "darwin" : "linux")(os.platform()),
      vendor: "pc",
      target: /* @__PURE__ */ ((p) => p === "win32" ? "x86_64-pc-windows-msvc" : p === "darwin" ? "x86_64-apple-darwin" : "x86_64-unknown-linux-gnu")(os.platform())
    };
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/customInspect.js
var require_customInspect = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/customInspect.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.customInspect = void 0;
    exports2.customInspect = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/env.js
var require_env = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/env.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.env = void 0;
    exports2.env = {
      get(key) {
        assertValidKey(key);
        return process.env[key];
      },
      set(key, value) {
        assertValidKey(key);
        assertValidValue(value);
        process.env[key] = value;
      },
      has(key) {
        assertValidKey(key);
        return key in process.env;
      },
      delete(key) {
        assertValidKey(key);
        delete process.env[key];
      },
      // @ts-expect-error https://github.com/denoland/deno/issues/10267
      toObject() {
        return { ...process.env };
      }
    };
    var invalidKeyChars = ["=", "\0"].map((c) => c.charCodeAt(0));
    var invalidValueChar = "\0".charCodeAt(0);
    function assertValidKey(key) {
      if (key.length === 0) {
        throw new TypeError("Key is an empty string.");
      }
      for (let i = 0; i < key.length; i++) {
        if (invalidKeyChars.includes(key.charCodeAt(i))) {
          const char = key.charCodeAt(i) === "\0".charCodeAt(0) ? "\\0" : key[i];
          throw new TypeError(`Key contains invalid characters: "${char}"`);
        }
      }
    }
    function assertValidValue(value) {
      for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) === invalidValueChar) {
          throw new TypeError('Value contains invalid characters: "\\0"');
        }
      }
    }
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/mainModule.js
var require_mainModule = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/mainModule.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mainModule = void 0;
    var path_1 = require("path");
    var url_1 = require("url");
    exports2.mainModule = (0, url_1.pathToFileURL)((_b = (_a = require.main) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : (0, path_1.join)(__dirname, "$deno$repl.ts")).href;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/metrics.js
var require_metrics = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/metrics.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.metrics = void 0;
    var metrics = function metrics2() {
      return {
        opsDispatched: 0,
        opsDispatchedSync: 0,
        opsDispatchedAsync: 0,
        opsDispatchedAsyncUnref: 0,
        opsCompleted: 0,
        opsCompletedSync: 0,
        opsCompletedAsync: 0,
        opsCompletedAsyncUnref: 0,
        bytesSentControl: 0,
        bytesSentData: 0,
        bytesReceived: 0,
        ops: {}
      };
    };
    exports2.metrics = metrics;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/noColor.js
var require_noColor = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/noColor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.noColor = void 0;
    exports2.noColor = process.env.NO_COLOR !== void 0;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/permissions.js
var require_permissions = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/permissions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.permissions = void 0;
    var Permissions_js_1 = require_Permissions();
    exports2.permissions = new Permissions_js_1.Permissions();
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/pid.js
var require_pid = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/pid.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pid = void 0;
    exports2.pid = process.pid;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/ppid.js
var require_ppid = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/ppid.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ppid = void 0;
    exports2.ppid = process.ppid;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/resources.js
var require_resources = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/resources.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resources = void 0;
    var resources = function resources2() {
      console.warn([
        "Deno.resources() shim returns a dummy object that does not update.",
        "If you think this is a mistake, raise an issue at https://github.com/denoland/node_deno_shims/issues"
      ].join("\n"));
      return {};
    };
    exports2.resources = resources;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/std.js
var require_std = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/std.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.stderr = exports2.stdout = exports2.stdin = void 0;
    var node_stream_1 = __importDefault(require("node:stream"));
    var node_tty_1 = __importDefault(require("node:tty"));
    var readSync_js_1 = require_readSync();
    var writeSync_js_1 = require_writeSync();
    function chain(fn, cleanup) {
      let prev;
      return function _fn(...args) {
        const curr = (prev || Promise.resolve()).then(() => fn(...args)).finally(cleanup || (() => {
        })).then((result) => {
          if (prev === curr)
            prev = void 0;
          return result;
        });
        return prev = curr;
      };
    }
    var stdinReadable;
    exports2.stdin = {
      rid: 0,
      isTerminal() {
        return node_tty_1.default.isatty(this.rid);
      },
      read: chain((p) => {
        return new Promise((resolve, reject) => {
          process.stdin.resume();
          process.stdin.on("error", onerror);
          process.stdin.once("readable", () => {
            var _a;
            process.stdin.off("error", onerror);
            const data = (_a = process.stdin.read(p.length)) !== null && _a !== void 0 ? _a : process.stdin.read();
            if (data) {
              p.set(data);
              resolve(data.length > 0 ? data.length : null);
            } else {
              resolve(null);
            }
          });
          function onerror(error) {
            reject(error);
            process.stdin.off("error", onerror);
          }
        });
      }, () => process.stdin.pause()),
      get readable() {
        if (stdinReadable == null) {
          stdinReadable = node_stream_1.default.Readable.toWeb(process.stdin);
        }
        return stdinReadable;
      },
      readSync(buffer) {
        return (0, readSync_js_1.readSync)(this.rid, buffer);
      },
      close() {
        process.stdin.destroy();
      },
      setRaw(mode, options2) {
        if (options2 === null || options2 === void 0 ? void 0 : options2.cbreak) {
          throw new Error("The cbreak option is not implemented.");
        }
        process.stdin.setRawMode(mode);
      }
    };
    var stdoutWritable;
    exports2.stdout = {
      rid: 1,
      isTerminal() {
        return node_tty_1.default.isatty(this.rid);
      },
      write: chain((p) => {
        return new Promise((resolve) => {
          const result = process.stdout.write(p);
          if (!result) {
            process.stdout.once("drain", () => resolve(p.length));
          } else {
            resolve(p.length);
          }
        });
      }),
      get writable() {
        if (stdoutWritable == null) {
          stdoutWritable = node_stream_1.default.Writable.toWeb(process.stdout);
        }
        return stdoutWritable;
      },
      writeSync(data) {
        return (0, writeSync_js_1.writeSync)(this.rid, data);
      },
      close() {
        process.stdout.destroy();
      }
    };
    var stderrWritable;
    exports2.stderr = {
      rid: 2,
      isTerminal() {
        return node_tty_1.default.isatty(this.rid);
      },
      write: chain((p) => {
        return new Promise((resolve) => {
          const result = process.stderr.write(p);
          if (!result) {
            process.stderr.once("drain", () => resolve(p.length));
          } else {
            resolve(p.length);
          }
        });
      }),
      get writable() {
        if (stderrWritable == null) {
          stderrWritable = node_stream_1.default.Writable.toWeb(process.stderr);
        }
        return stderrWritable;
      },
      writeSync(data) {
        return (0, writeSync_js_1.writeSync)(this.rid, data);
      },
      close() {
        process.stderr.destroy();
      }
    };
  }
});

// node_modules/@deno/shim-deno/dist/deno/internal/version.js
var require_version2 = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/internal/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.typescript = exports2.deno = void 0;
    exports2.deno = "1.40.3";
    exports2.typescript = "5.3.3";
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/version.js
var require_version3 = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.version = void 0;
    var version_js_1 = require_version2();
    exports2.version = {
      deno: version_js_1.deno,
      typescript: version_js_1.typescript,
      v8: process.versions.v8
    };
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables.js
var require_variables = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.version = exports2.resources = exports2.ppid = exports2.pid = exports2.permissions = exports2.noColor = exports2.metrics = exports2.mainModule = exports2.errors = exports2.env = exports2.customInspect = exports2.build = void 0;
    var build_js_1 = require_build();
    Object.defineProperty(exports2, "build", { enumerable: true, get: function() {
      return build_js_1.build;
    } });
    var customInspect_js_1 = require_customInspect();
    Object.defineProperty(exports2, "customInspect", { enumerable: true, get: function() {
      return customInspect_js_1.customInspect;
    } });
    var env_js_1 = require_env();
    Object.defineProperty(exports2, "env", { enumerable: true, get: function() {
      return env_js_1.env;
    } });
    exports2.errors = __importStar(require_errors());
    var mainModule_js_1 = require_mainModule();
    Object.defineProperty(exports2, "mainModule", { enumerable: true, get: function() {
      return mainModule_js_1.mainModule;
    } });
    var metrics_js_1 = require_metrics();
    Object.defineProperty(exports2, "metrics", { enumerable: true, get: function() {
      return metrics_js_1.metrics;
    } });
    var noColor_js_1 = require_noColor();
    Object.defineProperty(exports2, "noColor", { enumerable: true, get: function() {
      return noColor_js_1.noColor;
    } });
    var permissions_js_1 = require_permissions();
    Object.defineProperty(exports2, "permissions", { enumerable: true, get: function() {
      return permissions_js_1.permissions;
    } });
    var pid_js_1 = require_pid();
    Object.defineProperty(exports2, "pid", { enumerable: true, get: function() {
      return pid_js_1.pid;
    } });
    var ppid_js_1 = require_ppid();
    Object.defineProperty(exports2, "ppid", { enumerable: true, get: function() {
      return ppid_js_1.ppid;
    } });
    var resources_js_1 = require_resources();
    Object.defineProperty(exports2, "resources", { enumerable: true, get: function() {
      return resources_js_1.resources;
    } });
    __exportStar(require_std(), exports2);
    var version_js_1 = require_version3();
    Object.defineProperty(exports2, "version", { enumerable: true, get: function() {
      return version_js_1.version;
    } });
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/addSignalListener.js
var require_addSignalListener = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/addSignalListener.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.addSignalListener = void 0;
    var process_1 = __importDefault(require("process"));
    function denoSignalToNodeJs(signal) {
      if (signal === "SIGEMT") {
        throw new Error("SIGEMT is not supported");
      }
      return signal;
    }
    var addSignalListener = (signal, handler) => {
      process_1.default.addListener(denoSignalToNodeJs(signal), handler);
    };
    exports2.addSignalListener = addSignalListener;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/chdir.js
var require_chdir = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/chdir.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.chdir = void 0;
    var url_1 = require("url");
    var errorMap_js_1 = __importDefault(require_errorMap());
    var variables_js_1 = require_variables();
    var chdir = function(path) {
      try {
        return process.chdir(path instanceof URL ? (0, url_1.fileURLToPath)(path) : path);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "ENOENT") {
          throw new variables_js_1.errors.NotFound(`No such file or directory (os error 2), chdir '${path}'`);
        }
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.chdir = chdir;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/chmod.js
var require_chmod = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/chmod.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.chmod = void 0;
    var fs = __importStar(require("fs/promises"));
    exports2.chmod = fs.chmod;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/chmodSync.js
var require_chmodSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/chmodSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.chmodSync = void 0;
    var fs = __importStar(require("fs"));
    exports2.chmodSync = fs.chmodSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/chown.js
var require_chown = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/chown.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.chown = void 0;
    var fs = __importStar(require("fs/promises"));
    var chown = async (path, uid, gid) => await fs.chown(path, uid !== null && uid !== void 0 ? uid : -1, gid !== null && gid !== void 0 ? gid : -1);
    exports2.chown = chown;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/chownSync.js
var require_chownSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/chownSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.chownSync = void 0;
    var fs = __importStar(require("fs"));
    var chownSync = (path, uid, gid) => fs.chownSync(path, uid !== null && uid !== void 0 ? uid : -1, gid !== null && gid !== void 0 ? gid : -1);
    exports2.chownSync = chownSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/close.js
var require_close = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/close.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.close = void 0;
    var fs = __importStar(require("fs"));
    exports2.close = fs.closeSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/internal/Conn.js
var require_Conn = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/internal/Conn.js"(exports2) {
    "use strict";
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Conn_socket;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TlsConn = exports2.Conn = void 0;
    var net_1 = require("net");
    var FsFile_js_1 = require_FsFile();
    var Conn = class extends FsFile_js_1.FsFile {
      constructor(rid, localAddr, remoteAddr, socket) {
        super(rid);
        this.rid = rid;
        this.localAddr = localAddr;
        this.remoteAddr = remoteAddr;
        _Conn_socket.set(this, void 0);
        __classPrivateFieldSet(this, _Conn_socket, socket || new net_1.Socket({ fd: rid }), "f");
      }
      [(_Conn_socket = /* @__PURE__ */ new WeakMap(), Symbol.dispose)]() {
        this.close();
      }
      async closeWrite() {
        await new Promise((resolve) => __classPrivateFieldGet(this, _Conn_socket, "f").end(resolve));
      }
      setNoDelay(enable) {
        __classPrivateFieldGet(this, _Conn_socket, "f").setNoDelay(enable);
      }
      setKeepAlive(enable) {
        __classPrivateFieldGet(this, _Conn_socket, "f").setKeepAlive(enable);
      }
      ref() {
        __classPrivateFieldGet(this, _Conn_socket, "f").ref();
      }
      unref() {
        __classPrivateFieldGet(this, _Conn_socket, "f").unref();
      }
    };
    exports2.Conn = Conn;
    var TlsConn = class extends Conn {
      handshake() {
        console.warn("@deno/shim-deno: Handshake is not supported.");
        return Promise.resolve({
          alpnProtocol: null
        });
      }
    };
    exports2.TlsConn = TlsConn;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/connect.js
var require_connect = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/connect.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.connect = void 0;
    var net_1 = require("net");
    var Conn_js_1 = require_Conn();
    var connect = function connect2(options2) {
      if (options2.transport === "unix") {
        throw new Error("Unstable UnixConnectOptions is not implemented");
      }
      const { transport = "tcp", hostname = "127.0.0.1", port } = options2;
      if (transport !== "tcp") {
        throw new Error("Deno.connect is only implemented for transport: tcp");
      }
      const socket = (0, net_1.createConnection)({ port, host: hostname });
      socket.on("error", (err) => console.error(err));
      return new Promise((resolve) => {
        socket.once("connect", () => {
          const rid = socket._handle.fd;
          const localAddr = {
            // cannot be undefined while socket is connected
            hostname: socket.localAddress,
            port: socket.localPort,
            transport: "tcp"
          };
          const remoteAddr = {
            // cannot be undefined while socket is connected
            hostname: socket.remoteAddress,
            port: socket.remotePort,
            transport: "tcp"
          };
          resolve(new Conn_js_1.Conn(rid, localAddr, remoteAddr, socket));
        });
      });
    };
    exports2.connect = connect;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/readTextFile.js
var require_readTextFile = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/readTextFile.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readTextFile = void 0;
    var promises_1 = require("fs/promises");
    var errorMap_js_1 = __importDefault(require_errorMap());
    var readTextFile = async (path, { signal } = {}) => {
      try {
        return await (0, promises_1.readFile)(path, { encoding: "utf8", signal });
      } catch (e) {
        throw (0, errorMap_js_1.default)(e);
      }
    };
    exports2.readTextFile = readTextFile;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/connectTls.js
var require_connectTls = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/connectTls.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.connectTls = void 0;
    var tls_1 = require("tls");
    var Conn_js_1 = require_Conn();
    var readTextFile_js_1 = require_readTextFile();
    var connectTls = async function connectTls2({ port, hostname = "127.0.0.1", certFile }) {
      const cert = certFile && await (0, readTextFile_js_1.readTextFile)(certFile);
      const socket = (0, tls_1.connect)({ port, host: hostname, cert });
      return new Promise((resolve) => {
        socket.on("connect", () => {
          const rid = socket._handle.fd;
          const localAddr = {
            // cannot be undefined while socket is connected
            hostname: socket.localAddress,
            port: socket.localPort,
            transport: "tcp"
          };
          const remoteAddr = {
            // cannot be undefined while socket is connected
            hostname: socket.remoteAddress,
            port: socket.remotePort,
            transport: "tcp"
          };
          resolve(new Conn_js_1.TlsConn(rid, localAddr, remoteAddr, socket));
        });
      });
    };
    exports2.connectTls = connectTls;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/consoleSize.js
var require_consoleSize = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/consoleSize.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.consoleSize = void 0;
    var consoleSize = function consoleSize2() {
      const pipes = [process.stderr, process.stdout];
      for (const pipe of pipes) {
        if (pipe.columns != null) {
          const { columns, rows } = pipe;
          return { columns, rows };
        }
      }
      throw new Error("The handle is invalid.");
    };
    exports2.consoleSize = consoleSize;
  }
});

// node_modules/@deno/shim-deno/dist/deno/internal/consts.js
var require_consts = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/internal/consts.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DEFAULT_BUFFER_SIZE = void 0;
    exports2.DEFAULT_BUFFER_SIZE = 32 * 1024;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/copy.js
var require_copy = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/copy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.copy = void 0;
    var consts_js_1 = require_consts();
    var copy = async function copy2(src, dst, options2) {
      var _a;
      let n = 0;
      const bufSize = (_a = options2 === null || options2 === void 0 ? void 0 : options2.bufSize) !== null && _a !== void 0 ? _a : consts_js_1.DEFAULT_BUFFER_SIZE;
      const b = new Uint8Array(bufSize);
      let gotEOF = false;
      while (gotEOF === false) {
        const result = await src.read(b);
        if (result === null) {
          gotEOF = true;
        } else {
          let nwritten = 0;
          while (nwritten < result) {
            nwritten += await dst.write(b.subarray(nwritten, result));
          }
          n += nwritten;
        }
      }
      return n;
    };
    exports2.copy = copy;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/copyFile.js
var require_copyFile = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/copyFile.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.copyFile = void 0;
    var fs = __importStar(require("fs/promises"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var errors2 = __importStar(require_errors());
    var copyFile = async (src, dest) => {
      try {
        await fs.copyFile(src, dest);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "ENOENT") {
          throw new errors2.NotFound(`File not found, copy '${src}' -> '${dest}'`);
        }
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.copyFile = copyFile;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/copyFileSync.js
var require_copyFileSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/copyFileSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.copyFileSync = void 0;
    var fs = __importStar(require("fs"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var errors2 = __importStar(require_errors());
    var copyFileSync = (src, dest) => {
      try {
        fs.copyFileSync(src, dest);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "ENOENT") {
          throw new errors2.NotFound(`File not found, copy '${src}' -> '${dest}'`);
        }
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.copyFileSync = copyFileSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/internal/fs_flags.js
var require_fs_flags = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/internal/fs_flags.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getFsFlag = exports2.getCreationFlag = exports2.getAccessFlag = void 0;
    var errors2 = __importStar(require_errors());
    var fs_1 = require("fs");
    var os_1 = __importDefault(require("os"));
    var { O_APPEND, O_CREAT, O_EXCL, O_RDONLY, O_RDWR, O_TRUNC, O_WRONLY } = fs_1.constants;
    function getAccessFlag(opts) {
      if (opts.read && !opts.write && !opts.append)
        return O_RDONLY;
      if (!opts.read && opts.write && !opts.append)
        return O_WRONLY;
      if (opts.read && opts.write && !opts.append)
        return O_RDWR;
      if (!opts.read && opts.append)
        return O_WRONLY | O_APPEND;
      if (opts.read && opts.append)
        return O_RDWR | O_APPEND;
      if (!opts.read && !opts.write && !opts.append) {
        throw new errors2.BadResource("EINVAL: One of 'read', 'write', 'append' is required to open file.");
      }
      throw new errors2.BadResource("EINVAL: Invalid fs flags.");
    }
    exports2.getAccessFlag = getAccessFlag;
    function getCreationFlag(opts) {
      if (!opts.write && !opts.append) {
        if (opts.truncate || opts.create || opts.createNew) {
          throw new errors2.BadResource("EINVAL: One of 'write', 'append' is required to 'truncate', 'create' or 'createNew' file.");
        }
      }
      if (opts.append) {
        if (opts.truncate && !opts.createNew) {
          throw new errors2.BadResource("EINVAL: unexpected 'truncate': true and 'createNew': false when 'append' is true.");
        }
      }
      if (!opts.create && !opts.truncate && !opts.createNew)
        return 0;
      if (opts.create && !opts.truncate && !opts.createNew)
        return O_CREAT;
      if (!opts.create && opts.truncate && !opts.createNew) {
        if (os_1.default.platform() === "win32") {
          return O_CREAT | O_TRUNC;
        } else {
          return O_TRUNC;
        }
      }
      if (opts.create && opts.truncate && !opts.createNew) {
        return O_CREAT | O_TRUNC;
      }
      if (opts.createNew)
        return O_CREAT | O_EXCL;
      throw new errors2.BadResource("EINVAL: Invalid fs flags.");
    }
    exports2.getCreationFlag = getCreationFlag;
    function getFsFlag(flags) {
      return getAccessFlag(flags) | getCreationFlag(flags);
    }
    exports2.getFsFlag = getFsFlag;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/open.js
var require_open = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/open.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.open = void 0;
    var fs_1 = require("fs");
    var util_1 = require("util");
    var FsFile_js_1 = require_FsFile();
    var fs_flags_js_1 = require_fs_flags();
    var errorMap_js_1 = __importDefault(require_errorMap());
    var nodeOpen = (0, util_1.promisify)(fs_1.open);
    var open = async function open2(path, { read, write, append, truncate, create, createNew, mode = 438 } = {
      read: true
    }) {
      const flagMode = (0, fs_flags_js_1.getFsFlag)({
        read,
        write,
        append,
        truncate,
        create,
        createNew
      });
      try {
        const fd = await nodeOpen(path, flagMode, mode);
        return new FsFile_js_1.File(fd);
      } catch (err) {
        throw (0, errorMap_js_1.default)(err);
      }
    };
    exports2.open = open;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/create.js
var require_create = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/create.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.create = void 0;
    var open_js_1 = require_open();
    var create = async function create2(path) {
      return await (0, open_js_1.open)(path, { write: true, create: true, truncate: true });
    };
    exports2.create = create;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/openSync.js
var require_openSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/openSync.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.openSync = void 0;
    var fs_1 = require("fs");
    var FsFile_js_1 = require_FsFile();
    var fs_flags_js_1 = require_fs_flags();
    var errorMap_js_1 = __importDefault(require_errorMap());
    var openSync = function openSync2(path, { read, write, append, truncate, create, createNew, mode = 438 } = {
      read: true
    }) {
      const flagMode = (0, fs_flags_js_1.getFsFlag)({
        read,
        write,
        append,
        truncate,
        create,
        createNew
      });
      try {
        const fd = (0, fs_1.openSync)(path, flagMode, mode);
        return new FsFile_js_1.File(fd);
      } catch (err) {
        throw (0, errorMap_js_1.default)(err);
      }
    };
    exports2.openSync = openSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/createSync.js
var require_createSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/createSync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createSync = void 0;
    var openSync_js_1 = require_openSync();
    var createSync = function createSync2(path) {
      return (0, openSync_js_1.openSync)(path, {
        create: true,
        truncate: true,
        read: true,
        write: true
      });
    };
    exports2.createSync = createSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/cwd.js
var require_cwd = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/cwd.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.cwd = void 0;
    exports2.cwd = process.cwd;
  }
});

// node_modules/isexe/dist/commonjs/index.min.js
var require_index_min = __commonJS({
  "node_modules/isexe/dist/commonjs/index.min.js"(exports2) {
    "use strict";
    var a = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
    var _ = a((i) => {
      "use strict";
      Object.defineProperty(i, "__esModule", { value: true });
      i.sync = i.isexe = void 0;
      var M = require("node:fs"), x = require("node:fs/promises"), q = async (t, e = {}) => {
        let { ignoreErrors: r = false } = e;
        try {
          return d(await (0, x.stat)(t), e);
        } catch (s) {
          let n = s;
          if (r || n.code === "EACCES") return false;
          throw n;
        }
      };
      i.isexe = q;
      var m = (t, e = {}) => {
        let { ignoreErrors: r = false } = e;
        try {
          return d((0, M.statSync)(t), e);
        } catch (s) {
          let n = s;
          if (r || n.code === "EACCES") return false;
          throw n;
        }
      };
      i.sync = m;
      var d = (t, e) => t.isFile() && A(t, e), A = (t, e) => {
        let r = e.uid ?? process.getuid?.(), s = e.groups ?? process.getgroups?.() ?? [], n = e.gid ?? process.getgid?.() ?? s[0];
        if (r === void 0 || n === void 0) throw new Error("cannot get uid or gid");
        let u = /* @__PURE__ */ new Set([n, ...s]), c = t.mode, S = t.uid, P = t.gid, f = parseInt("100", 8), l = parseInt("010", 8), j = parseInt("001", 8), C = f | l;
        return !!(c & j || c & l && u.has(P) || c & f && S === r || c & C && r === 0);
      };
    });
    var g = a((o) => {
      "use strict";
      Object.defineProperty(o, "__esModule", { value: true });
      o.sync = o.isexe = void 0;
      var T = require("node:fs"), I = require("node:fs/promises"), D = require("node:path"), F = async (t, e = {}) => {
        let { ignoreErrors: r = false } = e;
        try {
          return y(await (0, I.stat)(t), t, e);
        } catch (s) {
          let n = s;
          if (r || n.code === "EACCES") return false;
          throw n;
        }
      };
      o.isexe = F;
      var L = (t, e = {}) => {
        let { ignoreErrors: r = false } = e;
        try {
          return y((0, T.statSync)(t), t, e);
        } catch (s) {
          let n = s;
          if (r || n.code === "EACCES") return false;
          throw n;
        }
      };
      o.sync = L;
      var B = (t, e) => {
        let { pathExt: r = process.env.PATHEXT || "" } = e, s = r.split(D.delimiter);
        if (s.indexOf("") !== -1) return true;
        for (let n of s) {
          let u = n.toLowerCase(), c = t.substring(t.length - u.length).toLowerCase();
          if (u && c === u) return true;
        }
        return false;
      }, y = (t, e, r) => t.isFile() && B(e, r);
    });
    var p = a((h) => {
      "use strict";
      Object.defineProperty(h, "__esModule", { value: true });
    });
    var v = exports2 && exports2.__createBinding || (Object.create ? (function(t, e, r, s) {
      s === void 0 && (s = r);
      var n = Object.getOwnPropertyDescriptor(e, r);
      (!n || ("get" in n ? !e.__esModule : n.writable || n.configurable)) && (n = { enumerable: true, get: function() {
        return e[r];
      } }), Object.defineProperty(t, s, n);
    }) : (function(t, e, r, s) {
      s === void 0 && (s = r), t[s] = e[r];
    }));
    var G = exports2 && exports2.__setModuleDefault || (Object.create ? (function(t, e) {
      Object.defineProperty(t, "default", { enumerable: true, value: e });
    }) : function(t, e) {
      t.default = e;
    });
    var w = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var t = function(e) {
        return t = Object.getOwnPropertyNames || function(r) {
          var s = [];
          for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (s[s.length] = n);
          return s;
        }, t(e);
      };
      return function(e) {
        if (e && e.__esModule) return e;
        var r = {};
        if (e != null) for (var s = t(e), n = 0; n < s.length; n++) s[n] !== "default" && v(r, e, s[n]);
        return G(r, e), r;
      };
    })();
    var X = exports2 && exports2.__exportStar || function(t, e) {
      for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && v(e, t, r);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sync = exports2.isexe = exports2.posix = exports2.win32 = void 0;
    var E = w(_());
    exports2.posix = E;
    var O = w(g());
    exports2.win32 = O;
    X(p(), exports2);
    var H = process.env._ISEXE_TEST_PLATFORM_ || process.platform;
    var b = H === "win32" ? O : E;
    exports2.isexe = b.isexe;
    exports2.sync = b.sync;
  }
});

// node_modules/which/lib/index.js
var require_lib = __commonJS({
  "node_modules/which/lib/index.js"(exports2, module2) {
    var { isexe, sync: isexeSync } = require_index_min();
    var { join, delimiter, sep, posix } = require("path");
    var isWindows = process.platform === "win32";
    var rSlash = new RegExp(`[${posix.sep}${sep === posix.sep ? "" : sep}]`.replace(/(\\)/g, "\\$1"));
    var rRel = new RegExp(`^\\.${rSlash.source}`);
    var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
    var getPathInfo = (cmd, {
      path: optPath = process.env.PATH,
      pathExt: optPathExt = process.env.PATHEXT,
      delimiter: optDelimiter = delimiter
    }) => {
      const pathEnv = cmd.match(rSlash) ? [""] : [
        // windows always checks the cwd first
        ...isWindows ? [process.cwd()] : [],
        ...(optPath || /* istanbul ignore next: very unusual */
        "").split(optDelimiter)
      ];
      if (isWindows) {
        const pathExtExe = optPathExt || [".EXE", ".CMD", ".BAT", ".COM"].join(optDelimiter);
        const pathExt = pathExtExe.split(optDelimiter).flatMap((item) => [item, item.toLowerCase()]);
        if (cmd.includes(".") && pathExt[0] !== "") {
          pathExt.unshift("");
        }
        return { pathEnv, pathExt, pathExtExe };
      }
      return { pathEnv, pathExt: [""] };
    };
    var getPathPart = (raw, cmd) => {
      const pathPart = /^".*"$/.test(raw) ? raw.slice(1, -1) : raw;
      const prefix = !pathPart && rRel.test(cmd) ? cmd.slice(0, 2) : "";
      return prefix + join(pathPart, cmd);
    };
    var which = async (cmd, opt = {}) => {
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (const envPart of pathEnv) {
        const p = getPathPart(envPart, cmd);
        for (const ext of pathExt) {
          const withExt = p + ext;
          const is = await isexe(withExt, { pathExt: pathExtExe, ignoreErrors: true });
          if (is) {
            if (!opt.all) {
              return withExt;
            }
            found.push(withExt);
          }
        }
      }
      if (opt.all && found.length) {
        return found;
      }
      if (opt.nothrow) {
        return null;
      }
      throw getNotFoundError(cmd);
    };
    var whichSync = (cmd, opt = {}) => {
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (const pathEnvPart of pathEnv) {
        const p = getPathPart(pathEnvPart, cmd);
        for (const ext of pathExt) {
          const withExt = p + ext;
          const is = isexeSync(withExt, { pathExt: pathExtExe, ignoreErrors: true });
          if (is) {
            if (!opt.all) {
              return withExt;
            }
            found.push(withExt);
          }
        }
      }
      if (opt.all && found.length) {
        return found;
      }
      if (opt.nothrow) {
        return null;
      }
      throw getNotFoundError(cmd);
    };
    module2.exports = which;
    which.sync = whichSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/execPath.js
var require_execPath = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/execPath.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.execPath = void 0;
    var which_1 = __importDefault(require_lib());
    var execPath = () => which_1.default.sync("deno");
    exports2.execPath = execPath;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/exit.js
var require_exit = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/exit.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.exit = void 0;
    var exit = function exit2(code) {
      return process.exit(code);
    };
    exports2.exit = exit;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/fsync.js
var require_fsync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/fsync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fsync = void 0;
    var fs_1 = require("fs");
    var util_1 = require("util");
    var fsync = function fsync2(rid) {
      return (0, util_1.promisify)(fs_1.fsync)(rid);
    };
    exports2.fsync = fsync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/fsyncSync.js
var require_fsyncSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/fsyncSync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fsyncSync = void 0;
    var fs_1 = require("fs");
    var fsyncSync = function fsyncSync2(rid) {
      return (0, fs_1.fsyncSync)(rid);
    };
    exports2.fsyncSync = fsyncSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/gid.js
var require_gid = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/gid.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.gid = void 0;
    var process_1 = __importDefault(require("process"));
    exports2.gid = (_a = process_1.default.getgid) !== null && _a !== void 0 ? _a : (() => null);
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/hostname.js
var require_hostname = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/hostname.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.hostname = void 0;
    var os = __importStar(require("os"));
    var hostname = function hostname2() {
      return os.hostname();
    };
    exports2.hostname = hostname;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/inspect.js
var require_inspect = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/inspect.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.inspect = void 0;
    var util = __importStar(require("util"));
    var inspect = (value, options2 = {}) => util.inspect(value, options2);
    exports2.inspect = inspect;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/kill.js
var require_kill = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/kill.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.kill = void 0;
    var os_1 = __importDefault(require("os"));
    var process_1 = __importDefault(require("process"));
    var kill = function(pid, signo) {
      if (pid < 0 && os_1.default.platform() === "win32") {
        throw new TypeError("Invalid pid");
      }
      process_1.default.kill(pid, signo);
    };
    exports2.kill = kill;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/link.js
var require_link = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/link.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.link = void 0;
    var fs = __importStar(require("fs/promises"));
    exports2.link = fs.link;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/linkSync.js
var require_linkSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/linkSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.linkSync = void 0;
    var fs = __importStar(require("fs"));
    exports2.linkSync = fs.linkSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/internal/Listener.js
var require_Listener = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/internal/Listener.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Listener_listener;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Listener = void 0;
    var close_js_1 = require_close();
    var errors2 = __importStar(require_errors());
    var Listener = class {
      constructor(rid, addr, listener) {
        this.rid = rid;
        this.addr = addr;
        _Listener_listener.set(this, void 0);
        __classPrivateFieldSet(this, _Listener_listener, listener, "f");
      }
      [(_Listener_listener = /* @__PURE__ */ new WeakMap(), Symbol.dispose)]() {
        this.close();
      }
      async accept() {
        if (!__classPrivateFieldGet(this, _Listener_listener, "f")) {
          throw new errors2.BadResource("Listener not initialised");
        }
        const result = await __classPrivateFieldGet(this, _Listener_listener, "f").next();
        if (result.done) {
          throw new errors2.BadResource("Server not listening");
        }
        return result.value;
      }
      async next() {
        let conn;
        try {
          conn = await this.accept();
        } catch (error) {
          if (error instanceof errors2.BadResource) {
            return { value: void 0, done: true };
          }
          throw error;
        }
        return { value: conn, done: false };
      }
      return(value) {
        this.close();
        return Promise.resolve({ value, done: true });
      }
      close() {
        (0, close_js_1.close)(this.rid);
      }
      ref() {
        throw new Error("Not implemented");
      }
      unref() {
        throw new Error("Not implemented");
      }
      [Symbol.asyncIterator]() {
        return this;
      }
    };
    exports2.Listener = Listener;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/listen.js
var require_listen = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/listen.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.listen = void 0;
    var net_1 = require("net");
    var Conn_js_1 = require_Conn();
    var Listener_js_1 = require_Listener();
    async function* _listen(server, waitFor) {
      await waitFor;
      while (server.listening) {
        yield new Promise((resolve) => server.once("connection", (socket) => {
          socket.on("error", (err) => console.error(err));
          const rid = socket._handle.fd;
          const localAddr = {
            // cannot be undefined while socket is connected
            hostname: socket.localAddress,
            port: socket.localPort,
            transport: "tcp"
          };
          const remoteAddr = {
            // cannot be undefined while socket is connected
            hostname: socket.remoteAddress,
            port: socket.remotePort,
            transport: "tcp"
          };
          resolve(new Conn_js_1.Conn(rid, localAddr, remoteAddr));
        }));
      }
    }
    var listen = function listen2(options2) {
      if (options2.transport === "unix") {
        throw new Error("Unstable UnixListenOptions is not implemented");
      }
      const { port, hostname = "0.0.0.0", transport = "tcp" } = options2;
      if (transport !== "tcp") {
        throw new Error("Deno.listen is only implemented for transport: tcp");
      }
      const server = (0, net_1.createServer)();
      const waitFor = new Promise((resolve) => (
        // server._handle.fd is assigned immediately on .listen()
        server.listen(port, hostname, resolve)
      ));
      const listener = new Listener_js_1.Listener(server._handle.fd, {
        hostname,
        port,
        transport: "tcp"
      }, _listen(server, waitFor));
      return listener;
    };
    exports2.listen = listen;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/readTextFileSync.js
var require_readTextFileSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/readTextFileSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readTextFileSync = void 0;
    var fs = __importStar(require("fs"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var readTextFileSync = function(path) {
      try {
        return fs.readFileSync(path, "utf8");
      } catch (e) {
        throw (0, errorMap_js_1.default)(e);
      }
    };
    exports2.readTextFileSync = readTextFileSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/listenTls.js
var require_listenTls = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/listenTls.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.listenTls = void 0;
    var tls_1 = require("tls");
    var Conn_js_1 = require_Conn();
    var Listener_js_1 = require_Listener();
    var readTextFileSync_js_1 = require_readTextFileSync();
    async function* _listen(server, waitFor) {
      await waitFor;
      while (server.listening) {
        yield new Promise((resolve) => server.once("secureConnection", (socket) => {
          socket.on("error", (err) => console.error(err));
          const rid = socket._handle.fd;
          const localAddr = {
            // cannot be undefined while socket is connected
            hostname: socket.localAddress,
            port: socket.localPort,
            transport: "tcp"
          };
          const remoteAddr = {
            // cannot be undefined while socket is connected
            hostname: socket.remoteAddress,
            port: socket.remotePort,
            transport: "tcp"
          };
          resolve(new Conn_js_1.TlsConn(rid, localAddr, remoteAddr));
        }));
      }
    }
    var listenTls = function listen({ port, hostname = "0.0.0.0", transport = "tcp", certFile, keyFile }) {
      if (transport !== "tcp") {
        throw new Error("Deno.listen is only implemented for transport: tcp");
      }
      const [cert, key] = [certFile, keyFile].map((f) => f == null ? void 0 : (0, readTextFileSync_js_1.readTextFileSync)(f));
      const server = (0, tls_1.createServer)({ cert, key });
      const waitFor = new Promise((resolve) => (
        // server._handle.fd is assigned immediately on .listen()
        server.listen(port, hostname, resolve)
      ));
      const listener = new Listener_js_1.Listener(server._handle.fd, {
        hostname,
        port,
        transport: "tcp"
      }, _listen(server, waitFor));
      return listener;
    };
    exports2.listenTls = listenTls;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/loadavg.js
var require_loadavg = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/loadavg.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.loadavg = void 0;
    var os = __importStar(require("os"));
    var loadavg = function loadavg2() {
      return os.loadavg();
    };
    exports2.loadavg = loadavg;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/lstat.js
var require_lstat = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/lstat.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.lstat = void 0;
    var fs = __importStar(require("fs/promises"));
    var stat_js_1 = require_stat();
    var errorMap_js_1 = __importDefault(require_errorMap());
    var lstat = async (path) => {
      try {
        return (0, stat_js_1.denoifyFileInfo)(await fs.lstat(path));
      } catch (e) {
        throw (0, errorMap_js_1.default)(e);
      }
    };
    exports2.lstat = lstat;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/lstatSync.js
var require_lstatSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/lstatSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.lstatSync = void 0;
    var fs = __importStar(require("fs"));
    var stat_js_1 = require_stat();
    var errorMap_js_1 = __importDefault(require_errorMap());
    var lstatSync = (path) => {
      try {
        return (0, stat_js_1.denoifyFileInfo)(fs.lstatSync(path));
      } catch (err) {
        throw (0, errorMap_js_1.default)(err);
      }
    };
    exports2.lstatSync = lstatSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/makeTempDir.js
var require_makeTempDir = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/makeTempDir.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.makeTempDir = void 0;
    var promises_1 = require("fs/promises");
    var path_1 = require("path");
    var os_1 = require("os");
    var makeTempDir = function makeTempDir2({ prefix = "" } = {}) {
      return (0, promises_1.mkdtemp)((0, path_1.join)((0, os_1.tmpdir)(), prefix || "/"));
    };
    exports2.makeTempDir = makeTempDir;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/makeTempDirSync.js
var require_makeTempDirSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/makeTempDirSync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.makeTempDirSync = void 0;
    var fs_1 = require("fs");
    var path_1 = require("path");
    var os_1 = require("os");
    var makeTempDirSync = function makeTempDirSync2({ prefix = "" } = {}) {
      return (0, fs_1.mkdtempSync)((0, path_1.join)((0, os_1.tmpdir)(), prefix || "/"));
    };
    exports2.makeTempDirSync = makeTempDirSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/internal/random_id.js
var require_random_id = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/internal/random_id.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.randomId = void 0;
    var randomId = () => {
      const n = (Math.random() * 1048575 * 1e6).toString(16);
      return "" + n.slice(0, 6);
    };
    exports2.randomId = randomId;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/writeTextFile.js
var require_writeTextFile = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/writeTextFile.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.writeTextFile = void 0;
    var fs = __importStar(require("fs/promises"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var fs_flags_js_1 = require_fs_flags();
    var writeTextFile = async function writeTextFile2(path, data, { append = false, create = true, createNew = false, mode, signal } = {}) {
      const truncate = create && !append;
      const flag = (0, fs_flags_js_1.getFsFlag)({
        append,
        create,
        createNew,
        truncate,
        write: true
      });
      try {
        await fs.writeFile(path, data, { flag, mode, signal });
        if (mode !== void 0)
          await fs.chmod(path, mode);
      } catch (error) {
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.writeTextFile = writeTextFile;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/makeTempFile.js
var require_makeTempFile = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/makeTempFile.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.makeTempFile = void 0;
    var os_1 = require("os");
    var path_1 = require("path");
    var random_id_js_1 = require_random_id();
    var writeTextFile_js_1 = require_writeTextFile();
    var makeTempFile = async function makeTempFile2({ prefix = "" } = {}) {
      const name = (0, path_1.join)((0, os_1.tmpdir)(), prefix, (0, random_id_js_1.randomId)());
      await (0, writeTextFile_js_1.writeTextFile)(name, "");
      return name;
    };
    exports2.makeTempFile = makeTempFile;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/writeTextFileSync.js
var require_writeTextFileSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/writeTextFileSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.writeTextFileSync = void 0;
    var fs = __importStar(require("fs"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var writeTextFileSync = (path, data, { append = false, create = true, mode } = {}) => {
      const flag = create ? append ? "a" : "w" : "r+";
      try {
        fs.writeFileSync(path, data, { flag, mode });
        if (mode !== void 0)
          fs.chmodSync(path, mode);
      } catch (error) {
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.writeTextFileSync = writeTextFileSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/makeTempFileSync.js
var require_makeTempFileSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/makeTempFileSync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.makeTempFileSync = void 0;
    var os_1 = require("os");
    var path_1 = require("path");
    var random_id_js_1 = require_random_id();
    var writeTextFileSync_js_1 = require_writeTextFileSync();
    var makeTempFileSync = function makeTempFileSync2({ prefix = "" } = {}) {
      const name = (0, path_1.join)((0, os_1.tmpdir)(), prefix, (0, random_id_js_1.randomId)());
      (0, writeTextFileSync_js_1.writeTextFileSync)(name, "");
      return name;
    };
    exports2.makeTempFileSync = makeTempFileSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/memoryUsage.js
var require_memoryUsage = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/memoryUsage.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.memoryUsage = void 0;
    exports2.memoryUsage = process.memoryUsage;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/mkdir.js
var require_mkdir = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/mkdir.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mkdir = void 0;
    var promises_1 = require("fs/promises");
    var errorMap_js_1 = __importDefault(require_errorMap());
    var variables_js_1 = require_variables();
    var mkdir = async function mkdir2(path, options2) {
      try {
        await (0, promises_1.mkdir)(path, options2);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "EEXIST") {
          throw new variables_js_1.errors.AlreadyExists(`File exists (os error 17), mkdir '${path}'`);
        }
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.mkdir = mkdir;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/mkdirSync.js
var require_mkdirSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/mkdirSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mkdirSync = void 0;
    var fs = __importStar(require("fs"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var variables_js_1 = require_variables();
    var mkdirSync = (path, options2) => {
      try {
        fs.mkdirSync(path, options2);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "EEXIST") {
          throw new variables_js_1.errors.AlreadyExists(`File exists (os error 17), mkdir '${path}'`);
        }
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.mkdirSync = mkdirSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/osRelease.js
var require_osRelease = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/osRelease.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.osRelease = void 0;
    var os_1 = require("os");
    var osRelease = function osRelease2() {
      return (0, os_1.release)();
    };
    exports2.osRelease = osRelease;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/osUptime.js
var require_osUptime = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/osUptime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.osUptime = void 0;
    var os_1 = require("os");
    var osUptime = function osUptime2() {
      return (0, os_1.uptime)();
    };
    exports2.osUptime = osUptime;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/readDir.js
var require_readDir = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/readDir.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readDir = void 0;
    var promises_1 = require("fs/promises");
    var errorMap_js_1 = __importDefault(require_errorMap());
    var readDir = async function* readDir2(path) {
      try {
        for await (const e of await (0, promises_1.opendir)(String(path))) {
          const ent = {
            name: e.name,
            isFile: e.isFile(),
            isDirectory: e.isDirectory(),
            isSymlink: e.isSymbolicLink()
          };
          yield ent;
        }
      } catch (e) {
        throw (0, errorMap_js_1.default)(e);
      }
    };
    exports2.readDir = readDir;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/readDirSync.js
var require_readDirSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/readDirSync.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readDirSync = void 0;
    var fs_1 = require("fs");
    var errorMap_js_1 = __importDefault(require_errorMap());
    var readDirSync = function* readDir(path) {
      try {
        for (const e of (0, fs_1.readdirSync)(String(path), { withFileTypes: true })) {
          const ent = {
            name: e.name,
            isFile: e.isFile(),
            isDirectory: e.isDirectory(),
            isSymlink: e.isSymbolicLink()
          };
          yield ent;
        }
      } catch (e) {
        throw (0, errorMap_js_1.default)(e);
      }
    };
    exports2.readDirSync = readDirSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/readFile.js
var require_readFile = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/readFile.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readFile = void 0;
    var promises_1 = require("fs/promises");
    var errorMap_js_1 = __importDefault(require_errorMap());
    var readFile = async function readFile2(path, { signal } = {}) {
      try {
        const buf = await (0, promises_1.readFile)(path, { signal });
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
      } catch (e) {
        throw (0, errorMap_js_1.default)(e);
      }
    };
    exports2.readFile = readFile;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/readFileSync.js
var require_readFileSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/readFileSync.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readFileSync = void 0;
    var fs_1 = require("fs");
    var errorMap_js_1 = __importDefault(require_errorMap());
    var readFileSync = function readFileSync2(path) {
      try {
        const buf = (0, fs_1.readFileSync)(path);
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
      } catch (e) {
        throw (0, errorMap_js_1.default)(e);
      }
    };
    exports2.readFileSync = readFileSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/readLink.js
var require_readLink = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/readLink.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readLink = void 0;
    var fs = __importStar(require("fs/promises"));
    exports2.readLink = fs.readlink;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/readLinkSync.js
var require_readLinkSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/readLinkSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readLinkSync = void 0;
    var fs = __importStar(require("fs"));
    exports2.readLinkSync = fs.readlinkSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/realPath.js
var require_realPath = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/realPath.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.realPath = void 0;
    var fs = __importStar(require("fs/promises"));
    exports2.realPath = fs.realpath;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/realPathSync.js
var require_realPathSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/realPathSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.realPathSync = void 0;
    var fs = __importStar(require("fs"));
    exports2.realPathSync = fs.realpathSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/remove.js
var require_remove = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/remove.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.remove = void 0;
    var promises_1 = require("fs/promises");
    var remove = async function remove2(path, options2 = {}) {
      const innerOptions = options2.recursive ? { recursive: true, force: true } : {};
      try {
        return await (0, promises_1.rm)(path, innerOptions);
      } catch (err) {
        if (err.code === "ERR_FS_EISDIR") {
          return await (0, promises_1.rmdir)(path, innerOptions);
        } else {
          throw err;
        }
      }
    };
    exports2.remove = remove;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/removeSignalListener.js
var require_removeSignalListener = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/removeSignalListener.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.removeSignalListener = void 0;
    var process_1 = __importDefault(require("process"));
    var removeSignalListener = (signal, handler) => {
      process_1.default.removeListener(signal, handler);
    };
    exports2.removeSignalListener = removeSignalListener;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/removeSync.js
var require_removeSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/removeSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.removeSync = void 0;
    var fs = __importStar(require("fs"));
    var removeSync = (path, options2 = {}) => {
      const innerOptions = options2.recursive ? { recursive: true, force: true } : {};
      try {
        fs.rmSync(path, innerOptions);
      } catch (err) {
        if (err.code === "ERR_FS_EISDIR") {
          fs.rmdirSync(path, innerOptions);
        } else {
          throw err;
        }
      }
    };
    exports2.removeSync = removeSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/rename.js
var require_rename = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/rename.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.rename = void 0;
    var promises_1 = require("fs/promises");
    var rename = function rename2(oldpath, newpath) {
      return (0, promises_1.rename)(oldpath, newpath);
    };
    exports2.rename = rename;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/renameSync.js
var require_renameSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/renameSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.renameSync = void 0;
    var fs = __importStar(require("fs"));
    exports2.renameSync = fs.renameSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/resolveDns.js
var require_resolveDns = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/resolveDns.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveDns = void 0;
    var dns_1 = __importDefault(require("dns"));
    var resolveDns = function resolveDns2(query, recordType, options2) {
      if (options2) {
        throw Error(`resolveDns option not implemnted yet`);
      }
      switch (recordType) {
        case "A":
        /* falls through */
        case "AAAA":
        case "CNAME":
        case "NS":
        case "PTR":
          return new Promise((resolve, reject) => {
            dns_1.default.resolve(query, recordType, (err, addresses) => {
              if (err) {
                reject(err);
              } else {
                resolve(addresses);
              }
            });
          });
        case "ANAME":
        case "CAA":
        case "MX":
        case "NAPTR":
        case "SOA":
        case "SRV":
        case "TXT":
        default:
          throw Error(`resolveDns type ${recordType} not implemnted yet`);
      }
    };
    exports2.resolveDns = resolveDns;
  }
});

// node_modules/@deno/shim-deno/dist/deno/internal/streams.js
var require_streams = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/internal/streams.js"(exports2) {
    "use strict";
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _BufferStreamReader_instances;
    var _BufferStreamReader_stream;
    var _BufferStreamReader_error;
    var _BufferStreamReader_ended;
    var _BufferStreamReader_pendingActions;
    var _BufferStreamReader_runPendingActions;
    var _StreamWriter_stream;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StreamWriter = exports2.BufferStreamReader = void 0;
    var BufferStreamReader = class {
      constructor(stream) {
        _BufferStreamReader_instances.add(this);
        _BufferStreamReader_stream.set(this, void 0);
        _BufferStreamReader_error.set(this, void 0);
        _BufferStreamReader_ended.set(this, false);
        _BufferStreamReader_pendingActions.set(this, []);
        __classPrivateFieldSet(this, _BufferStreamReader_stream, stream, "f");
        __classPrivateFieldGet(this, _BufferStreamReader_stream, "f").pause();
        __classPrivateFieldGet(this, _BufferStreamReader_stream, "f").on("error", (error) => {
          __classPrivateFieldSet(this, _BufferStreamReader_error, error, "f");
          __classPrivateFieldGet(this, _BufferStreamReader_instances, "m", _BufferStreamReader_runPendingActions).call(this);
        });
        __classPrivateFieldGet(this, _BufferStreamReader_stream, "f").on("readable", () => {
          __classPrivateFieldGet(this, _BufferStreamReader_instances, "m", _BufferStreamReader_runPendingActions).call(this);
        });
        __classPrivateFieldGet(this, _BufferStreamReader_stream, "f").on("end", () => {
          __classPrivateFieldSet(this, _BufferStreamReader_ended, true, "f");
          __classPrivateFieldGet(this, _BufferStreamReader_instances, "m", _BufferStreamReader_runPendingActions).call(this);
        });
      }
      readAll() {
        return new Promise((resolve, reject) => {
          const chunks = [];
          const action = () => {
            if (__classPrivateFieldGet(this, _BufferStreamReader_error, "f")) {
              reject(__classPrivateFieldGet(this, _BufferStreamReader_error, "f"));
              return;
            }
            const buffer = __classPrivateFieldGet(this, _BufferStreamReader_stream, "f").read();
            if (buffer != null) {
              chunks.push(buffer);
              __classPrivateFieldGet(this, _BufferStreamReader_pendingActions, "f").push(action);
            } else if (__classPrivateFieldGet(this, _BufferStreamReader_ended, "f")) {
              const result = Buffer.concat(chunks);
              resolve(result);
            } else {
              __classPrivateFieldGet(this, _BufferStreamReader_pendingActions, "f").push(action);
            }
          };
          action();
        });
      }
      read(p) {
        return new Promise((resolve, reject) => {
          const action = () => {
            if (__classPrivateFieldGet(this, _BufferStreamReader_error, "f")) {
              reject(__classPrivateFieldGet(this, _BufferStreamReader_error, "f"));
              return;
            }
            const readBuffer = __classPrivateFieldGet(this, _BufferStreamReader_stream, "f").read(p.byteLength);
            if (readBuffer && readBuffer.byteLength > 0) {
              readBuffer.copy(p, 0, 0, readBuffer.byteLength);
              resolve(readBuffer.byteLength);
              return;
            }
            if (__classPrivateFieldGet(this, _BufferStreamReader_ended, "f")) {
              resolve(null);
            } else {
              __classPrivateFieldGet(this, _BufferStreamReader_pendingActions, "f").push(action);
            }
          };
          action();
        });
      }
    };
    exports2.BufferStreamReader = BufferStreamReader;
    _BufferStreamReader_stream = /* @__PURE__ */ new WeakMap(), _BufferStreamReader_error = /* @__PURE__ */ new WeakMap(), _BufferStreamReader_ended = /* @__PURE__ */ new WeakMap(), _BufferStreamReader_pendingActions = /* @__PURE__ */ new WeakMap(), _BufferStreamReader_instances = /* @__PURE__ */ new WeakSet(), _BufferStreamReader_runPendingActions = function _BufferStreamReader_runPendingActions2() {
      const errors2 = [];
      for (const action of __classPrivateFieldGet(this, _BufferStreamReader_pendingActions, "f").splice(0)) {
        try {
          action();
        } catch (err) {
          errors2.push(err);
        }
      }
      if (errors2.length > 0) {
        throw errors2.length > 1 ? new globalThis.AggregateError(errors2) : errors2[0];
      }
    };
    var StreamWriter = class {
      constructor(stream) {
        _StreamWriter_stream.set(this, void 0);
        __classPrivateFieldSet(this, _StreamWriter_stream, stream, "f");
      }
      write(p) {
        return new Promise((resolve, reject) => {
          __classPrivateFieldGet(this, _StreamWriter_stream, "f").write(p, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(p.byteLength);
            }
          });
        });
      }
    };
    exports2.StreamWriter = StreamWriter;
    _StreamWriter_stream = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/run.js
var require_run = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/run.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __classPrivateFieldSet = exports2 && exports2.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports2 && exports2.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _Process_process;
    var _Process_stderr;
    var _Process_stdout;
    var _Process_stdin;
    var _Process_status;
    var _Process_receivedStatus;
    var _ProcessReadStream_stream;
    var _ProcessReadStream_bufferStreamReader;
    var _ProcessReadStream_closed;
    var _ProcessWriteStream_stream;
    var _ProcessWriteStream_streamWriter;
    var _ProcessWriteStream_closed;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Process = exports2.run = void 0;
    var child_process_1 = __importDefault(require("child_process"));
    var fs_1 = __importDefault(require("fs"));
    var os_1 = __importDefault(require("os"));
    var url_1 = __importDefault(require("url"));
    var events_1 = require("events");
    var which_1 = __importDefault(require_lib());
    var streams_js_1 = require_streams();
    var errors2 = __importStar(require_errors());
    var run = function run2(options2) {
      const [cmd, ...args] = options2.cmd;
      if (options2.cwd && !fs_1.default.existsSync(options2.cwd)) {
        throw new Error("The directory name is invalid.");
      }
      const commandName = getCmd(cmd);
      if (!which_1.default.sync(commandName, { nothrow: true })) {
        throw new errors2.NotFound("The system cannot find the file specified.");
      }
      const process2 = child_process_1.default.spawn(commandName, args, {
        cwd: options2.cwd,
        env: getEnv(options2),
        uid: options2.uid,
        gid: options2.gid,
        shell: false,
        stdio: [
          getStdio(options2.stdin, "in"),
          getStdio(options2.stdout, "out"),
          getStdio(options2.stderr, "out")
        ]
      });
      return new Process(process2);
    };
    exports2.run = run;
    function getStdio(value, kind) {
      if (value === "inherit" || value == null) {
        return "inherit";
      } else if (value === "piped") {
        return "pipe";
      } else if (value === "null") {
        return "ignore";
      } else if (typeof value === "number") {
        switch (kind) {
          case "in":
            return fs_1.default.createReadStream(null, { fd: value });
          case "out":
            return fs_1.default.createWriteStream(null, { fd: value });
          default: {
            const _assertNever = kind;
            throw new Error("Unreachable.");
          }
        }
      } else {
        const _assertNever = value;
        throw new Error("Unknown value.");
      }
    }
    function getCmd(firstArg) {
      if (firstArg instanceof URL) {
        return url_1.default.fileURLToPath(firstArg);
      } else {
        return firstArg;
      }
    }
    function getEnv(options2) {
      var _a;
      const env = (_a = options2.env) !== null && _a !== void 0 ? _a : {};
      for (const name in process.env) {
        if (!Object.prototype.hasOwnProperty.call(env, name)) {
          if (options2.clearEnv) {
            if (os_1.default.platform() === "win32") {
              env[name] = "";
            } else {
              delete env[name];
            }
          } else {
            env[name] = process.env[name];
          }
        }
      }
      return env;
    }
    var Process = class {
      /** @internal */
      constructor(process2) {
        var _a, _b, _c;
        _Process_process.set(this, void 0);
        _Process_stderr.set(this, void 0);
        _Process_stdout.set(this, void 0);
        _Process_stdin.set(this, void 0);
        _Process_status.set(this, void 0);
        _Process_receivedStatus.set(this, false);
        __classPrivateFieldSet(this, _Process_process, process2, "f");
        __classPrivateFieldSet(this, _Process_stdout, (_a = ProcessReadStream.fromNullable(__classPrivateFieldGet(this, _Process_process, "f").stdout)) !== null && _a !== void 0 ? _a : null, "f");
        __classPrivateFieldSet(this, _Process_stderr, (_b = ProcessReadStream.fromNullable(__classPrivateFieldGet(this, _Process_process, "f").stderr)) !== null && _b !== void 0 ? _b : null, "f");
        __classPrivateFieldSet(this, _Process_stdin, (_c = ProcessWriteStream.fromNullable(__classPrivateFieldGet(this, _Process_process, "f").stdin)) !== null && _c !== void 0 ? _c : null, "f");
        __classPrivateFieldSet(this, _Process_status, (0, events_1.once)(process2, "exit"), "f");
      }
      get rid() {
        return NaN;
      }
      get pid() {
        return __classPrivateFieldGet(this, _Process_process, "f").pid;
      }
      get stdin() {
        return __classPrivateFieldGet(this, _Process_stdin, "f");
      }
      get stdout() {
        return __classPrivateFieldGet(this, _Process_stdout, "f");
      }
      get stderr() {
        return __classPrivateFieldGet(this, _Process_stderr, "f");
      }
      async status() {
        const [receivedCode, signalName] = await __classPrivateFieldGet(this, _Process_status, "f");
        const signal = signalName ? os_1.default.constants.signals[signalName] : receivedCode > 128 ? receivedCode - 128 : void 0;
        const code = receivedCode != null ? receivedCode : signal != null ? 128 + signal : void 0;
        const success = code === 0;
        __classPrivateFieldSet(this, _Process_receivedStatus, true, "f");
        return { code, signal, success };
      }
      async output() {
        if (!__classPrivateFieldGet(this, _Process_stdout, "f")) {
          throw new TypeError("stdout was not piped");
        }
        const result = await __classPrivateFieldGet(this, _Process_stdout, "f").readAll();
        __classPrivateFieldGet(this, _Process_stdout, "f").close();
        return result;
      }
      async stderrOutput() {
        if (!__classPrivateFieldGet(this, _Process_stderr, "f")) {
          throw new TypeError("stderr was not piped");
        }
        const result = await __classPrivateFieldGet(this, _Process_stderr, "f").readAll();
        __classPrivateFieldGet(this, _Process_stderr, "f").close();
        return result;
      }
      close() {
        __classPrivateFieldGet(this, _Process_process, "f").unref();
        __classPrivateFieldGet(this, _Process_process, "f").kill();
      }
      kill(signo = "SIGTERM") {
        if (__classPrivateFieldGet(this, _Process_receivedStatus, "f")) {
          throw new errors2.NotFound("entity not found");
        }
        __classPrivateFieldGet(this, _Process_process, "f").kill(signo);
      }
    };
    exports2.Process = Process;
    _Process_process = /* @__PURE__ */ new WeakMap(), _Process_stderr = /* @__PURE__ */ new WeakMap(), _Process_stdout = /* @__PURE__ */ new WeakMap(), _Process_stdin = /* @__PURE__ */ new WeakMap(), _Process_status = /* @__PURE__ */ new WeakMap(), _Process_receivedStatus = /* @__PURE__ */ new WeakMap();
    var ProcessReadStream = class _ProcessReadStream {
      constructor(stream) {
        _ProcessReadStream_stream.set(this, void 0);
        _ProcessReadStream_bufferStreamReader.set(this, void 0);
        _ProcessReadStream_closed.set(this, false);
        __classPrivateFieldSet(this, _ProcessReadStream_stream, stream, "f");
        __classPrivateFieldSet(this, _ProcessReadStream_bufferStreamReader, new streams_js_1.BufferStreamReader(stream), "f");
      }
      static fromNullable(stream) {
        return stream ? new _ProcessReadStream(stream) : void 0;
      }
      readAll() {
        if (__classPrivateFieldGet(this, _ProcessReadStream_closed, "f")) {
          return Promise.resolve(new Uint8Array(0));
        } else {
          return __classPrivateFieldGet(this, _ProcessReadStream_bufferStreamReader, "f").readAll();
        }
      }
      read(p) {
        if (__classPrivateFieldGet(this, _ProcessReadStream_closed, "f")) {
          return Promise.resolve(null);
        } else {
          return __classPrivateFieldGet(this, _ProcessReadStream_bufferStreamReader, "f").read(p);
        }
      }
      close() {
        __classPrivateFieldSet(this, _ProcessReadStream_closed, true, "f");
        __classPrivateFieldGet(this, _ProcessReadStream_stream, "f").destroy();
      }
      get readable() {
        throw new Error("Not implemented.");
      }
      get writable() {
        throw new Error("Not implemented.");
      }
    };
    _ProcessReadStream_stream = /* @__PURE__ */ new WeakMap(), _ProcessReadStream_bufferStreamReader = /* @__PURE__ */ new WeakMap(), _ProcessReadStream_closed = /* @__PURE__ */ new WeakMap();
    var ProcessWriteStream = class _ProcessWriteStream {
      constructor(stream) {
        _ProcessWriteStream_stream.set(this, void 0);
        _ProcessWriteStream_streamWriter.set(this, void 0);
        _ProcessWriteStream_closed.set(this, false);
        __classPrivateFieldSet(this, _ProcessWriteStream_stream, stream, "f");
        __classPrivateFieldSet(this, _ProcessWriteStream_streamWriter, new streams_js_1.StreamWriter(stream), "f");
      }
      static fromNullable(stream) {
        return stream ? new _ProcessWriteStream(stream) : void 0;
      }
      write(p) {
        if (__classPrivateFieldGet(this, _ProcessWriteStream_closed, "f")) {
          return Promise.resolve(0);
        } else {
          return __classPrivateFieldGet(this, _ProcessWriteStream_streamWriter, "f").write(p);
        }
      }
      close() {
        __classPrivateFieldSet(this, _ProcessWriteStream_closed, true, "f");
        __classPrivateFieldGet(this, _ProcessWriteStream_stream, "f").end();
      }
    };
    _ProcessWriteStream_stream = /* @__PURE__ */ new WeakMap(), _ProcessWriteStream_streamWriter = /* @__PURE__ */ new WeakMap(), _ProcessWriteStream_closed = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/shutdown.js
var require_shutdown = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/shutdown.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.shutdown = void 0;
    var net_1 = require("net");
    var shutdown = async function shutdown2(rid) {
      await new Promise((resolve) => new net_1.Socket({ fd: rid }).end(resolve));
    };
    exports2.shutdown = shutdown;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/statSync.js
var require_statSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/statSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.statSync = void 0;
    var fs = __importStar(require("fs"));
    var stat_js_1 = require_stat();
    var errorMap_js_1 = __importDefault(require_errorMap());
    var statSync = (path) => {
      try {
        return (0, stat_js_1.denoifyFileInfo)(fs.statSync(path));
      } catch (err) {
        throw (0, errorMap_js_1.default)(err);
      }
    };
    exports2.statSync = statSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/symlink.js
var require_symlink = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/symlink.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.symlink = void 0;
    var fs = __importStar(require("fs/promises"));
    var symlink = async (oldpath, newpath, options2) => await fs.symlink(oldpath, newpath, options2 === null || options2 === void 0 ? void 0 : options2.type);
    exports2.symlink = symlink;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/symlinkSync.js
var require_symlinkSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/symlinkSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.symlinkSync = void 0;
    var fs = __importStar(require("fs"));
    var symlinkSync = (oldpath, newpath, options2) => fs.symlinkSync(oldpath, newpath, options2 === null || options2 === void 0 ? void 0 : options2.type);
    exports2.symlinkSync = symlinkSync;
  }
});

// node_modules/@deno/shim-deno-test/dist/definitions.js
var require_definitions = __commonJS({
  "node_modules/@deno/shim-deno-test/dist/definitions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.testDefinitions = void 0;
    exports2.testDefinitions = [];
  }
});

// node_modules/@deno/shim-deno-test/dist/test.js
var require_test = __commonJS({
  "node_modules/@deno/shim-deno-test/dist/test.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.test = void 0;
    var definitions_js_1 = require_definitions();
    exports2.test = Object.assign(function test() {
      handleDefinition(arguments);
    }, {
      ignore() {
        handleDefinition(arguments, { ignore: true });
      },
      only() {
        handleDefinition(arguments, { only: true });
      }
    });
    function handleDefinition(args, additional) {
      var _a, _b;
      let testDef;
      const firstArg = args[0];
      const secondArg = args[1];
      const thirdArg = args[2];
      if (typeof firstArg === "string") {
        if (typeof secondArg === "object") {
          if (typeof thirdArg === "function") {
            if (secondArg.fn != null) {
              throw new TypeError("Unexpected 'fn' field in options, test function is already provided as the third argument.");
            }
          }
          if (secondArg.name != null) {
            throw new TypeError("Unexpected 'name' field in options, test name is already provided as the first argument.");
          }
          testDef = { name: firstArg, fn: thirdArg, ...secondArg };
        } else {
          testDef = { name: firstArg, fn: secondArg };
        }
      } else if (firstArg instanceof Function) {
        if (firstArg.name.length === 0) {
          throw new TypeError("The test function must have a name");
        }
        testDef = { fn: firstArg, name: firstArg.name };
        if (secondArg != null) {
          throw new TypeError("Unexpected second argument to Deno.test()");
        }
      } else if (typeof firstArg === "object") {
        testDef = { ...firstArg };
        if (typeof secondArg === "function") {
          testDef.fn = secondArg;
          if (firstArg.fn != null) {
            throw new TypeError("Unexpected 'fn' field in options, test function is already provided as the second argument.");
          }
          if (testDef.name == null) {
            if (secondArg.name.length === 0) {
              throw new TypeError("The test function must have a name");
            }
            testDef.name = secondArg.name;
          }
        } else {
          if (typeof firstArg.fn !== "function") {
            throw new TypeError("Expected 'fn' field in the first argument to be a test function.");
          }
        }
      } else {
        throw new TypeError("Unknown test overload");
      }
      if (typeof testDef.fn !== "function") {
        throw new TypeError("Missing test function");
      }
      if (((_b = (_a = testDef.name) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) === 0) {
        throw new TypeError("The test name can't be empty");
      }
      if (additional === null || additional === void 0 ? void 0 : additional.ignore) {
        testDef.ignore = true;
      }
      if (additional === null || additional === void 0 ? void 0 : additional.only) {
        testDef.only = true;
      }
      definitions_js_1.testDefinitions.push(testDef);
    }
  }
});

// node_modules/@deno/shim-deno-test/dist/index.js
var require_dist = __commonJS({
  "node_modules/@deno/shim-deno-test/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.testDefinitions = exports2.Deno = void 0;
    exports2.Deno = require_test();
    __exportStar(require_test(), exports2);
    var definitions_js_1 = require_definitions();
    Object.defineProperty(exports2, "testDefinitions", { enumerable: true, get: function() {
      return definitions_js_1.testDefinitions;
    } });
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/test.js
var require_test2 = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/test.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.test = void 0;
    var shim_deno_test_1 = require_dist();
    Object.defineProperty(exports2, "test", { enumerable: true, get: function() {
      return shim_deno_test_1.test;
    } });
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/truncate.js
var require_truncate = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/truncate.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.truncate = void 0;
    var fs = __importStar(require("fs/promises"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var variables_js_1 = require_variables();
    var truncate = async (name, len) => {
      try {
        return await fs.truncate(name, len);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "ENOENT") {
          throw new variables_js_1.errors.NotFound(`No such file or directory (os error 2), truncate '${name}'`);
        }
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.truncate = truncate;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/truncateSync.js
var require_truncateSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/truncateSync.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.truncateSync = void 0;
    var fs = __importStar(require("fs"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var variables_js_1 = require_variables();
    var truncateSync = (name, len) => {
      try {
        return fs.truncateSync(name, len);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "ENOENT") {
          throw new variables_js_1.errors.NotFound(`No such file or directory (os error 2), truncate '${name}'`);
        }
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.truncateSync = truncateSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/uid.js
var require_uid = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/uid.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.uid = void 0;
    var process_1 = __importDefault(require("process"));
    exports2.uid = (_a = process_1.default.getuid) !== null && _a !== void 0 ? _a : (() => null);
  }
});

// node_modules/@deno/shim-deno/dist/deno/internal/iterutil.js
var require_iterutil = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/internal/iterutil.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.merge = exports2.filterAsync = exports2.mapAsync = exports2.map = void 0;
    function* map(iter, f) {
      for (const i of iter) {
        yield f(i);
      }
    }
    exports2.map = map;
    async function* mapAsync(iter, f) {
      for await (const i of iter) {
        yield f(i);
      }
    }
    exports2.mapAsync = mapAsync;
    async function* filterAsync(iter, filter) {
      for await (const i of iter) {
        if (filter(i)) {
          yield i;
        }
      }
    }
    exports2.filterAsync = filterAsync;
    async function* merge(iterables) {
      const racers = new Map(map(map(iterables, (iter) => iter[Symbol.asyncIterator]()), (iter) => [iter, iter.next()]));
      while (racers.size > 0) {
        const winner = await Promise.race(map(racers.entries(), ([iter, prom]) => prom.then((result) => ({ result, iter }))));
        if (winner.result.done) {
          racers.delete(winner.iter);
        } else {
          yield await winner.result.value;
          racers.set(winner.iter, winner.iter.next());
        }
      }
    }
    exports2.merge = merge;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/watchFs.js
var require_watchFs = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/watchFs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.watchFs = void 0;
    var promises_1 = require("fs/promises");
    var path_1 = require("path");
    var iterutil_js_1 = require_iterutil();
    var watchFs = function watchFs2(paths, options2 = { recursive: true }) {
      paths = Array.isArray(paths) ? paths : [paths];
      const ac = new AbortController();
      const { signal } = ac;
      const rid = -1;
      const masterWatcher = (0, iterutil_js_1.merge)(paths.map((path) => (0, iterutil_js_1.mapAsync)((0, iterutil_js_1.filterAsync)((0, promises_1.watch)(path, { recursive: options2 === null || options2 === void 0 ? void 0 : options2.recursive, signal }), (info) => info.filename != null), (info) => ({
        kind: "modify",
        paths: [(0, path_1.resolve)(path, info.filename)]
      }))));
      function close() {
        ac.abort();
      }
      return Object.assign(masterWatcher, {
        rid,
        close,
        [Symbol.dispose]: close
      });
    };
    exports2.watchFs = watchFs;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/writeFile.js
var require_writeFile = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/writeFile.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.writeFile = void 0;
    var fs = __importStar(require("fs/promises"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var fs_flags_js_1 = require_fs_flags();
    var writeFile = async function writeFile2(path, data, { append = false, create = true, createNew = false, mode, signal } = {}) {
      const truncate = create && !append;
      const flag = (0, fs_flags_js_1.getFsFlag)({ append, create, createNew, truncate, write: true });
      try {
        await fs.writeFile(path, data, { flag, signal });
        if (mode != null)
          await fs.chmod(path, mode);
      } catch (error) {
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.writeFile = writeFile;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions/writeFileSync.js
var require_writeFileSync = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions/writeFileSync.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.writeFileSync = void 0;
    var os_1 = require("os");
    var openSync_js_1 = require_openSync();
    var errorMap_js_1 = __importDefault(require_errorMap());
    var statSync_js_1 = require_statSync();
    var chmodSync_js_1 = require_chmodSync();
    var writeFileSync = function writeFileSync2(path, data, options2 = {}) {
      try {
        if (options2.create !== void 0) {
          const create = !!options2.create;
          if (!create) {
            (0, statSync_js_1.statSync)(path);
          }
        }
        const openOptions = {
          write: true,
          create: true,
          createNew: options2.createNew,
          append: !!options2.append,
          truncate: !options2.append
        };
        const file = (0, openSync_js_1.openSync)(path, openOptions);
        if (options2.mode !== void 0 && options2.mode !== null && (0, os_1.platform)() !== "win32") {
          (0, chmodSync_js_1.chmodSync)(path, options2.mode);
        }
        let nwritten = 0;
        while (nwritten < data.length) {
          nwritten += file.writeSync(data.subarray(nwritten));
        }
        file.close();
      } catch (e) {
        throw (0, errorMap_js_1.default)(e);
      }
    };
    exports2.writeFileSync = writeFileSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/variables/args.js
var require_args = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/variables/args.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.args = void 0;
    exports2.args = process.argv.slice(2);
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/functions.js
var require_functions = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/functions.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.read = exports2.osUptime = exports2.osRelease = exports2.openSync = exports2.open = exports2.mkdirSync = exports2.mkdir = exports2.memoryUsage = exports2.makeTempFileSync = exports2.makeTempFile = exports2.makeTempDirSync = exports2.makeTempDir = exports2.lstatSync = exports2.lstat = exports2.loadavg = exports2.listenTls = exports2.listen = exports2.linkSync = exports2.link = exports2.kill = exports2.inspect = exports2.hostname = exports2.gid = exports2.ftruncateSync = exports2.ftruncate = exports2.fsyncSync = exports2.fsync = exports2.fstatSync = exports2.fstat = exports2.fdatasyncSync = exports2.fdatasync = exports2.exit = exports2.execPath = exports2.cwd = exports2.createSync = exports2.create = exports2.copyFileSync = exports2.copyFile = exports2.copy = exports2.consoleSize = exports2.connectTls = exports2.connect = exports2.close = exports2.chownSync = exports2.chown = exports2.chmodSync = exports2.chmod = exports2.chdir = exports2.addSignalListener = exports2.isatty = void 0;
    exports2.utimeSync = exports2.utime = exports2.futimeSync = exports2.futime = exports2.args = exports2.writeTextFileSync = exports2.writeTextFile = exports2.writeSync = exports2.writeFileSync = exports2.writeFile = exports2.write = exports2.watchFs = exports2.uid = exports2.truncateSync = exports2.truncate = exports2.test = exports2.symlinkSync = exports2.symlink = exports2.statSync = exports2.stat = exports2.shutdown = exports2.run = exports2.Process = exports2.resolveDns = exports2.renameSync = exports2.rename = exports2.removeSync = exports2.removeSignalListener = exports2.remove = exports2.realPathSync = exports2.realPath = exports2.readTextFileSync = exports2.readTextFile = exports2.readSync = exports2.readLinkSync = exports2.readLink = exports2.readFileSync = exports2.readFile = exports2.readDirSync = exports2.readDir = void 0;
    var fs_1 = __importDefault(require("fs"));
    var errorMap_js_1 = __importDefault(require_errorMap());
    var variables_js_1 = require_variables();
    var tty_1 = require("tty");
    Object.defineProperty(exports2, "isatty", { enumerable: true, get: function() {
      return tty_1.isatty;
    } });
    var addSignalListener_js_1 = require_addSignalListener();
    Object.defineProperty(exports2, "addSignalListener", { enumerable: true, get: function() {
      return addSignalListener_js_1.addSignalListener;
    } });
    var chdir_js_1 = require_chdir();
    Object.defineProperty(exports2, "chdir", { enumerable: true, get: function() {
      return chdir_js_1.chdir;
    } });
    var chmod_js_1 = require_chmod();
    Object.defineProperty(exports2, "chmod", { enumerable: true, get: function() {
      return chmod_js_1.chmod;
    } });
    var chmodSync_js_1 = require_chmodSync();
    Object.defineProperty(exports2, "chmodSync", { enumerable: true, get: function() {
      return chmodSync_js_1.chmodSync;
    } });
    var chown_js_1 = require_chown();
    Object.defineProperty(exports2, "chown", { enumerable: true, get: function() {
      return chown_js_1.chown;
    } });
    var chownSync_js_1 = require_chownSync();
    Object.defineProperty(exports2, "chownSync", { enumerable: true, get: function() {
      return chownSync_js_1.chownSync;
    } });
    var close_js_1 = require_close();
    Object.defineProperty(exports2, "close", { enumerable: true, get: function() {
      return close_js_1.close;
    } });
    var connect_js_1 = require_connect();
    Object.defineProperty(exports2, "connect", { enumerable: true, get: function() {
      return connect_js_1.connect;
    } });
    var connectTls_js_1 = require_connectTls();
    Object.defineProperty(exports2, "connectTls", { enumerable: true, get: function() {
      return connectTls_js_1.connectTls;
    } });
    var consoleSize_js_1 = require_consoleSize();
    Object.defineProperty(exports2, "consoleSize", { enumerable: true, get: function() {
      return consoleSize_js_1.consoleSize;
    } });
    var copy_js_1 = require_copy();
    Object.defineProperty(exports2, "copy", { enumerable: true, get: function() {
      return copy_js_1.copy;
    } });
    var copyFile_js_1 = require_copyFile();
    Object.defineProperty(exports2, "copyFile", { enumerable: true, get: function() {
      return copyFile_js_1.copyFile;
    } });
    var copyFileSync_js_1 = require_copyFileSync();
    Object.defineProperty(exports2, "copyFileSync", { enumerable: true, get: function() {
      return copyFileSync_js_1.copyFileSync;
    } });
    var create_js_1 = require_create();
    Object.defineProperty(exports2, "create", { enumerable: true, get: function() {
      return create_js_1.create;
    } });
    var createSync_js_1 = require_createSync();
    Object.defineProperty(exports2, "createSync", { enumerable: true, get: function() {
      return createSync_js_1.createSync;
    } });
    var cwd_js_1 = require_cwd();
    Object.defineProperty(exports2, "cwd", { enumerable: true, get: function() {
      return cwd_js_1.cwd;
    } });
    var execPath_js_1 = require_execPath();
    Object.defineProperty(exports2, "execPath", { enumerable: true, get: function() {
      return execPath_js_1.execPath;
    } });
    var exit_js_1 = require_exit();
    Object.defineProperty(exports2, "exit", { enumerable: true, get: function() {
      return exit_js_1.exit;
    } });
    var fdatasync_js_1 = require_fdatasync();
    Object.defineProperty(exports2, "fdatasync", { enumerable: true, get: function() {
      return fdatasync_js_1.fdatasync;
    } });
    var fdatasyncSync_js_1 = require_fdatasyncSync();
    Object.defineProperty(exports2, "fdatasyncSync", { enumerable: true, get: function() {
      return fdatasyncSync_js_1.fdatasyncSync;
    } });
    var fstat_js_1 = require_fstat();
    Object.defineProperty(exports2, "fstat", { enumerable: true, get: function() {
      return fstat_js_1.fstat;
    } });
    var fstatSync_js_1 = require_fstatSync();
    Object.defineProperty(exports2, "fstatSync", { enumerable: true, get: function() {
      return fstatSync_js_1.fstatSync;
    } });
    var fsync_js_1 = require_fsync();
    Object.defineProperty(exports2, "fsync", { enumerable: true, get: function() {
      return fsync_js_1.fsync;
    } });
    var fsyncSync_js_1 = require_fsyncSync();
    Object.defineProperty(exports2, "fsyncSync", { enumerable: true, get: function() {
      return fsyncSync_js_1.fsyncSync;
    } });
    var ftruncate_js_1 = require_ftruncate();
    Object.defineProperty(exports2, "ftruncate", { enumerable: true, get: function() {
      return ftruncate_js_1.ftruncate;
    } });
    var ftruncateSync_js_1 = require_ftruncateSync();
    Object.defineProperty(exports2, "ftruncateSync", { enumerable: true, get: function() {
      return ftruncateSync_js_1.ftruncateSync;
    } });
    var gid_js_1 = require_gid();
    Object.defineProperty(exports2, "gid", { enumerable: true, get: function() {
      return gid_js_1.gid;
    } });
    var hostname_js_1 = require_hostname();
    Object.defineProperty(exports2, "hostname", { enumerable: true, get: function() {
      return hostname_js_1.hostname;
    } });
    var inspect_js_1 = require_inspect();
    Object.defineProperty(exports2, "inspect", { enumerable: true, get: function() {
      return inspect_js_1.inspect;
    } });
    var kill_js_1 = require_kill();
    Object.defineProperty(exports2, "kill", { enumerable: true, get: function() {
      return kill_js_1.kill;
    } });
    var link_js_1 = require_link();
    Object.defineProperty(exports2, "link", { enumerable: true, get: function() {
      return link_js_1.link;
    } });
    var linkSync_js_1 = require_linkSync();
    Object.defineProperty(exports2, "linkSync", { enumerable: true, get: function() {
      return linkSync_js_1.linkSync;
    } });
    var listen_js_1 = require_listen();
    Object.defineProperty(exports2, "listen", { enumerable: true, get: function() {
      return listen_js_1.listen;
    } });
    var listenTls_js_1 = require_listenTls();
    Object.defineProperty(exports2, "listenTls", { enumerable: true, get: function() {
      return listenTls_js_1.listenTls;
    } });
    var loadavg_js_1 = require_loadavg();
    Object.defineProperty(exports2, "loadavg", { enumerable: true, get: function() {
      return loadavg_js_1.loadavg;
    } });
    var lstat_js_1 = require_lstat();
    Object.defineProperty(exports2, "lstat", { enumerable: true, get: function() {
      return lstat_js_1.lstat;
    } });
    var lstatSync_js_1 = require_lstatSync();
    Object.defineProperty(exports2, "lstatSync", { enumerable: true, get: function() {
      return lstatSync_js_1.lstatSync;
    } });
    var makeTempDir_js_1 = require_makeTempDir();
    Object.defineProperty(exports2, "makeTempDir", { enumerable: true, get: function() {
      return makeTempDir_js_1.makeTempDir;
    } });
    var makeTempDirSync_js_1 = require_makeTempDirSync();
    Object.defineProperty(exports2, "makeTempDirSync", { enumerable: true, get: function() {
      return makeTempDirSync_js_1.makeTempDirSync;
    } });
    var makeTempFile_js_1 = require_makeTempFile();
    Object.defineProperty(exports2, "makeTempFile", { enumerable: true, get: function() {
      return makeTempFile_js_1.makeTempFile;
    } });
    var makeTempFileSync_js_1 = require_makeTempFileSync();
    Object.defineProperty(exports2, "makeTempFileSync", { enumerable: true, get: function() {
      return makeTempFileSync_js_1.makeTempFileSync;
    } });
    var memoryUsage_js_1 = require_memoryUsage();
    Object.defineProperty(exports2, "memoryUsage", { enumerable: true, get: function() {
      return memoryUsage_js_1.memoryUsage;
    } });
    var mkdir_js_1 = require_mkdir();
    Object.defineProperty(exports2, "mkdir", { enumerable: true, get: function() {
      return mkdir_js_1.mkdir;
    } });
    var mkdirSync_js_1 = require_mkdirSync();
    Object.defineProperty(exports2, "mkdirSync", { enumerable: true, get: function() {
      return mkdirSync_js_1.mkdirSync;
    } });
    var open_js_1 = require_open();
    Object.defineProperty(exports2, "open", { enumerable: true, get: function() {
      return open_js_1.open;
    } });
    var openSync_js_1 = require_openSync();
    Object.defineProperty(exports2, "openSync", { enumerable: true, get: function() {
      return openSync_js_1.openSync;
    } });
    var osRelease_js_1 = require_osRelease();
    Object.defineProperty(exports2, "osRelease", { enumerable: true, get: function() {
      return osRelease_js_1.osRelease;
    } });
    var osUptime_js_1 = require_osUptime();
    Object.defineProperty(exports2, "osUptime", { enumerable: true, get: function() {
      return osUptime_js_1.osUptime;
    } });
    var read_js_1 = require_read();
    Object.defineProperty(exports2, "read", { enumerable: true, get: function() {
      return read_js_1.read;
    } });
    var readDir_js_1 = require_readDir();
    Object.defineProperty(exports2, "readDir", { enumerable: true, get: function() {
      return readDir_js_1.readDir;
    } });
    var readDirSync_js_1 = require_readDirSync();
    Object.defineProperty(exports2, "readDirSync", { enumerable: true, get: function() {
      return readDirSync_js_1.readDirSync;
    } });
    var readFile_js_1 = require_readFile();
    Object.defineProperty(exports2, "readFile", { enumerable: true, get: function() {
      return readFile_js_1.readFile;
    } });
    var readFileSync_js_1 = require_readFileSync();
    Object.defineProperty(exports2, "readFileSync", { enumerable: true, get: function() {
      return readFileSync_js_1.readFileSync;
    } });
    var readLink_js_1 = require_readLink();
    Object.defineProperty(exports2, "readLink", { enumerable: true, get: function() {
      return readLink_js_1.readLink;
    } });
    var readLinkSync_js_1 = require_readLinkSync();
    Object.defineProperty(exports2, "readLinkSync", { enumerable: true, get: function() {
      return readLinkSync_js_1.readLinkSync;
    } });
    var readSync_js_1 = require_readSync();
    Object.defineProperty(exports2, "readSync", { enumerable: true, get: function() {
      return readSync_js_1.readSync;
    } });
    var readTextFile_js_1 = require_readTextFile();
    Object.defineProperty(exports2, "readTextFile", { enumerable: true, get: function() {
      return readTextFile_js_1.readTextFile;
    } });
    var readTextFileSync_js_1 = require_readTextFileSync();
    Object.defineProperty(exports2, "readTextFileSync", { enumerable: true, get: function() {
      return readTextFileSync_js_1.readTextFileSync;
    } });
    var realPath_js_1 = require_realPath();
    Object.defineProperty(exports2, "realPath", { enumerable: true, get: function() {
      return realPath_js_1.realPath;
    } });
    var realPathSync_js_1 = require_realPathSync();
    Object.defineProperty(exports2, "realPathSync", { enumerable: true, get: function() {
      return realPathSync_js_1.realPathSync;
    } });
    var remove_js_1 = require_remove();
    Object.defineProperty(exports2, "remove", { enumerable: true, get: function() {
      return remove_js_1.remove;
    } });
    var removeSignalListener_js_1 = require_removeSignalListener();
    Object.defineProperty(exports2, "removeSignalListener", { enumerable: true, get: function() {
      return removeSignalListener_js_1.removeSignalListener;
    } });
    var removeSync_js_1 = require_removeSync();
    Object.defineProperty(exports2, "removeSync", { enumerable: true, get: function() {
      return removeSync_js_1.removeSync;
    } });
    var rename_js_1 = require_rename();
    Object.defineProperty(exports2, "rename", { enumerable: true, get: function() {
      return rename_js_1.rename;
    } });
    var renameSync_js_1 = require_renameSync();
    Object.defineProperty(exports2, "renameSync", { enumerable: true, get: function() {
      return renameSync_js_1.renameSync;
    } });
    var resolveDns_js_1 = require_resolveDns();
    Object.defineProperty(exports2, "resolveDns", { enumerable: true, get: function() {
      return resolveDns_js_1.resolveDns;
    } });
    var run_js_1 = require_run();
    Object.defineProperty(exports2, "Process", { enumerable: true, get: function() {
      return run_js_1.Process;
    } });
    Object.defineProperty(exports2, "run", { enumerable: true, get: function() {
      return run_js_1.run;
    } });
    var shutdown_js_1 = require_shutdown();
    Object.defineProperty(exports2, "shutdown", { enumerable: true, get: function() {
      return shutdown_js_1.shutdown;
    } });
    var stat_js_1 = require_stat();
    Object.defineProperty(exports2, "stat", { enumerable: true, get: function() {
      return stat_js_1.stat;
    } });
    var statSync_js_1 = require_statSync();
    Object.defineProperty(exports2, "statSync", { enumerable: true, get: function() {
      return statSync_js_1.statSync;
    } });
    var symlink_js_1 = require_symlink();
    Object.defineProperty(exports2, "symlink", { enumerable: true, get: function() {
      return symlink_js_1.symlink;
    } });
    var symlinkSync_js_1 = require_symlinkSync();
    Object.defineProperty(exports2, "symlinkSync", { enumerable: true, get: function() {
      return symlinkSync_js_1.symlinkSync;
    } });
    var test_js_1 = require_test2();
    Object.defineProperty(exports2, "test", { enumerable: true, get: function() {
      return test_js_1.test;
    } });
    var truncate_js_1 = require_truncate();
    Object.defineProperty(exports2, "truncate", { enumerable: true, get: function() {
      return truncate_js_1.truncate;
    } });
    var truncateSync_js_1 = require_truncateSync();
    Object.defineProperty(exports2, "truncateSync", { enumerable: true, get: function() {
      return truncateSync_js_1.truncateSync;
    } });
    var uid_js_1 = require_uid();
    Object.defineProperty(exports2, "uid", { enumerable: true, get: function() {
      return uid_js_1.uid;
    } });
    var watchFs_js_1 = require_watchFs();
    Object.defineProperty(exports2, "watchFs", { enumerable: true, get: function() {
      return watchFs_js_1.watchFs;
    } });
    var write_js_1 = require_write();
    Object.defineProperty(exports2, "write", { enumerable: true, get: function() {
      return write_js_1.write;
    } });
    var writeFile_js_1 = require_writeFile();
    Object.defineProperty(exports2, "writeFile", { enumerable: true, get: function() {
      return writeFile_js_1.writeFile;
    } });
    var writeFileSync_js_1 = require_writeFileSync();
    Object.defineProperty(exports2, "writeFileSync", { enumerable: true, get: function() {
      return writeFileSync_js_1.writeFileSync;
    } });
    var writeSync_js_1 = require_writeSync();
    Object.defineProperty(exports2, "writeSync", { enumerable: true, get: function() {
      return writeSync_js_1.writeSync;
    } });
    var writeTextFile_js_1 = require_writeTextFile();
    Object.defineProperty(exports2, "writeTextFile", { enumerable: true, get: function() {
      return writeTextFile_js_1.writeTextFile;
    } });
    var writeTextFileSync_js_1 = require_writeTextFileSync();
    Object.defineProperty(exports2, "writeTextFileSync", { enumerable: true, get: function() {
      return writeTextFileSync_js_1.writeTextFileSync;
    } });
    var args_js_1 = require_args();
    Object.defineProperty(exports2, "args", { enumerable: true, get: function() {
      return args_js_1.args;
    } });
    var futime = async function(rid, atime, mtime) {
      try {
        await new Promise((resolve, reject) => {
          fs_1.default.futimes(rid, atime, mtime, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      } catch (error) {
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.futime = futime;
    var futimeSync = function(rid, atime, mtime) {
      try {
        fs_1.default.futimesSync(rid, atime, mtime);
      } catch (error) {
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.futimeSync = futimeSync;
    var utime = async function(path, atime, mtime) {
      try {
        await fs_1.default.promises.utimes(path, atime, mtime);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "ENOENT") {
          throw new variables_js_1.errors.NotFound(`No such file or directory (os error 2), utime '${path}'`);
        }
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.utime = utime;
    var utimeSync = function(path, atime, mtime) {
      try {
        fs_1.default.utimesSync(path, atime, mtime);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "ENOENT") {
          throw new variables_js_1.errors.NotFound(`No such file or directory (os error 2), utime '${path}'`);
        }
        throw (0, errorMap_js_1.default)(error);
      }
    };
    exports2.utimeSync = utimeSync;
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/types.js
var require_types = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@deno/shim-deno/dist/deno/stable/main.js
var require_main = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno/stable/main.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_classes(), exports2);
    __exportStar(require_enums(), exports2);
    __exportStar(require_functions(), exports2);
    __exportStar(require_types(), exports2);
    __exportStar(require_variables(), exports2);
  }
});

// node_modules/@deno/shim-deno/dist/deno.js
var require_deno = __commonJS({
  "node_modules/@deno/shim-deno/dist/deno.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_main(), exports2);
  }
});

// node_modules/@deno/shim-deno/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@deno/shim-deno/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Deno = void 0;
    exports2.Deno = __importStar(require_deno());
  }
});

// node_modules/yahoo-finance2/esm/tests/fetchCache.js
var fetchCache_exports = {};
__export(fetchCache_exports, {
  default: () => fetchCache_default,
  fetchCacheSetup: () => fetchCacheSetup
});
function fetchCacheSetup() {
  (0, import_bdd.beforeAll)(() => {
    globalThis.fetch = (0, import_mock.spy)(fetchCache);
  });
  (0, import_bdd.afterAll)(() => {
    globalThis.fetch = originalFetch;
  });
}
var import_mock, import_bdd, import_deno4, import_fs, fetchCache, originalFetch, fetchCache_default;
var init_fetchCache = __esm({
  "node_modules/yahoo-finance2/esm/tests/fetchCache.js"() {
    "use strict";
    import_mock = require("@std/testing/mock");
    import_bdd = require("@std/testing/bdd");
    import_deno4 = __toESM(require("@gadicc/fetch-mock-cache/runtimes/deno.ts"), 1);
    import_fs = __toESM(require("@gadicc/fetch-mock-cache/stores/fs.ts"), 1);
    fetchCache = (0, import_deno4.default)({ Store: import_fs.default });
    originalFetch = globalThis.fetch;
    fetchCache_default = fetchCache;
  }
});

// node_modules/yahoo-finance2/esm/src/lib/cookieJar.js
var import_tough_cookie = __toESM(require_cookie2(), 1);
var ExtendedCookieJar = class extends import_tough_cookie.CookieJar {
  async setFromSetCookieHeaders(setCookieHeader, url) {
    let cookies;
    if (typeof setCookieHeader === "undefined") {
    } else if (setCookieHeader instanceof Array) {
      cookies = setCookieHeader.map((header) => import_tough_cookie.Cookie.parse(header));
    } else if (typeof setCookieHeader === "string") {
      cookies = [import_tough_cookie.Cookie.parse(setCookieHeader)];
    }
    if (cookies) {
      for (const cookie of cookies) {
        if (cookie instanceof import_tough_cookie.Cookie) {
          await this.setCookie(cookie, url);
        }
      }
    }
  }
};

// node_modules/yahoo-finance2/esm/src/lib/options.js
var options = {
  YF_QUERY_HOST: "query2.finance.yahoo.com",
  cookieJar: new ExtendedCookieJar(),
  queue: {
    concurrency: 4,
    // Min: 1, Max: Infinity
    timeout: 60
  },
  validation: {
    logErrors: true,
    logOptionsErrors: true
  },
  logger: {
    // deno-lint-ignore no-explicit-any
    info: (...args) => console.log(...args),
    // deno-lint-ignore no-explicit-any
    warn: (...args) => console.warn(...args),
    // deno-lint-ignore no-explicit-any
    error: (...args) => console.error(...args),
    // deno-lint-ignore no-explicit-any
    debug: (..._args) => {
    }
  }
};
var options_default = options;

// node_modules/yahoo-finance2/esm/src/lib/queue.js
var Queue = class {
  constructor(opts = {}) {
    Object.defineProperty(this, "concurrency", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "_running", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_queue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    if (opts.concurrency)
      this.concurrency = opts.concurrency;
  }
  runNext() {
    const job = this._queue.shift();
    if (!job)
      return;
    this._running++;
    job.func().then((result) => job.resolve(result)).catch((error) => job.reject(error)).finally(() => {
      this._running--;
      this.checkQueue();
    });
  }
  checkQueue() {
    if (this._running < this.concurrency)
      this.runNext();
  }
  // deno-lint-ignore no-explicit-any
  add(func) {
    return new Promise((resolve, reject) => {
      this._queue.push({ func, resolve, reject });
      this.checkQueue();
    });
  }
};

// node_modules/yahoo-finance2/esm/src/lib/errors.js
var BadRequestError = class extends Error {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BadRequestError"
    });
  }
};
var HTTPError = class extends Error {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "HTTPError"
    });
  }
};
var InvalidOptionsError = class extends Error {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidOptionsError"
    });
  }
};
var NoEnvironmentError = class extends Error {
  constructor() {
    super(...arguments);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "NoEnvironmentError"
    });
  }
};
var FailedYahooValidationError = class extends Error {
  constructor(message, { result, errors: errors2 }) {
    super(message);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "FailedYahooValidationError"
    });
    Object.defineProperty(this, "result", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "errors", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.result = result;
    this.errors = errors2;
  }
};
var errors = {
  BadRequestError,
  HTTPError,
  InvalidOptionsError,
  NoEnvironmentError,
  FailedYahooValidationError
};
var errors_default = errors;

// node_modules/yahoo-finance2/esm/deno.js
var deno_default = {
  "name": "@gadicc/yahoo-finance2",
  "version": "0.0.1",
  "tasks": {
    "cli": "deno run -A bin/yahoo-finance.ts",
    "install-cli": "deno install -A --global -n yahoo-finance npm:yahoo-finance/bin/yahoo-finance.ts",
    "schema": "deno run --allow-read --allow-write --allow-env scripts/schema.ts > schema.json",
    "test": "deno test -A",
    "build:npm": "deno run -A scripts/build_npm.ts",
    "devTODO": "deno run --watch main.ts"
  },
  "exports": "./src/index.ts",
  "imports": {
    "@deno/dnt": "jsr:@deno/dnt@^0.41.3",
    "@gadicc/fetch-mock-cache": "jsr:@gadicc/fetch-mock-cache@^2.1.3",
    "@jest/types": "npm:@jest/types@^29.6.3",
    "@std/expect": "jsr:@std/expect@^1.0.13",
    "@std/fmt": "jsr:@std/fmt@^1.0.5",
    "@std/testing": "jsr:@std/testing@^1.0.9",
    "@types/json-schema": "npm:@types/json-schema@^7.0.15",
    "conventional-changelog-conventionalcommits": "npm:conventional-changelog-conventionalcommits@^8.0.0",
    "fetch-mock-cache": "npm:fetch-mock-cache@^2.1.3",
    "jest-get-type": "npm:jest-get-type@^29.6.3",
    "json-schema": "npm:json-schema@^0.4.0",
    "oas-schema-walker": "npm:oas-schema-walker@^1.1.5",
    "semantic-release": "npm:semantic-release@^24.2.3",
    "tough-cookie": "npm:tough-cookie@^5.1.1",
    "tough-cookie-file-store": "npm:tough-cookie-file-store@^2.0.3",
    "ts-json-schema-generator": "npm:ts-json-schema-generator@1.5.1"
  }
};

// node_modules/yahoo-finance2/esm/src/lib/getCrumb.js
var import_tough_cookie2 = __toESM(require_cookie2(), 1);

// node_modules/yahoo-finance2/esm/src/lib/notices.js
var logger = options_default.logger || console;
var notices = {
  yahooSurvey: {
    id: "yahooSurvey",
    text: "Please consider completing the survey at https://bit.ly/yahoo-finance-api-feedback if you haven't already; for more info see https://github.com/gadicc/node-yahoo-finance2/issues/764#issuecomment-2056623851.",
    onceOnly: true
  },
  ripHistorical: {
    id: "ripHistorical",
    text: "[Deprecated] historical() relies on an API that Yahoo have removed.  We'll map this request to chart() for convenience, but, please consider using chart() directly instead; for more info see https://github.com/gadicc/node-yahoo-finance2/issues/795.",
    level: "warn",
    onceOnly: true
  }
};
function showNotice(id) {
  const n = notices[id];
  if (!n)
    throw new Error(`Unknown notice id: ${id}`);
  if (n.suppress)
    return;
  if (n.onceOnly)
    n.suppress = true;
  const text = n.text + (n.onceOnly ? "  This will only be shown once, but you" : "You") + " can suppress this message in future with `yahooFinance.suppressNotices(['" + id + "'])`.";
  const level = n.level || "info";
  logger[level](text);
}

// node_modules/yahoo-finance2/esm/src/lib/getCrumb.js
var CONFIG_FAKE_URL = "http://config.yf2/";
var crumb = null;
var parseHtmlEntities = (str) => str.replace(/&#x([0-9A-Fa-f]{1,3});/gi, (_, numStr) => String.fromCharCode(parseInt(numStr, 16)));
async function _getCrumb(cookieJar, fetch2, fetchOptionsBase, logger2, url = "https://finance.yahoo.com/quote/AAPL", develOverride = "getCrumb-quote-AAPL.json", noCache = false) {
  if (!crumb) {
    const cookies = await cookieJar.getCookies(CONFIG_FAKE_URL);
    for (const cookie2 of cookies) {
      if (cookie2.key === "crumb") {
        crumb = cookie2.value;
        logger2.debug("Retrieved crumb from cookie store: " + crumb);
        break;
      }
    }
  }
  if (crumb && !noCache) {
    const existingCookies = await cookieJar.getCookies(url, { expire: true });
    if (existingCookies.length)
      return crumb;
  }
  async function processSetCookieHeader(header, url2) {
    if (header) {
      await cookieJar.setFromSetCookieHeaders(header, url2);
      return true;
    }
    return false;
  }
  logger2.debug("Fetching crumb and cookies from " + url + "...");
  const fetchOptions = {
    ...fetchOptionsBase,
    headers: {
      ...fetchOptionsBase.headers,
      // NB, we won't get a set-cookie header back without this:
      accept: "text/html,application/xhtml+xml,application/xml"
      // This request will get our first cookies, so nothing to send.
      // cookie: await cookieJar.getCookieString(url),
    },
    redirect: "manual",
    devel: fetchOptionsBase.devel && develOverride
  };
  const response = await fetch2(url, fetchOptions);
  await processSetCookieHeader(response.headers.getSetCookie(), url);
  const location = response.headers.get("location");
  if (location) {
    if (location.match(/guce.yahoo/)) {
      const consentFetchOptions = {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          // GUCS=XXXXXXXX; Max-Age=1800; Domain=.yahoo.com; Path=/; Secure
          cookie: await cookieJar.getCookieString(location)
        },
        devel: "getCrumb-quote-AAPL-consent.html"
      };
      logger2.debug(
        "fetch",
        location
        /*, consentFetchOptions */
      );
      const consentResponse = await fetch2(location, consentFetchOptions);
      const consentLocation = consentResponse.headers.get("location");
      if (consentLocation) {
        if (!consentLocation.match(/collectConsent/)) {
          throw new Error("Unexpected redirect to " + consentLocation);
        }
        const collectConsentFetchOptions = {
          ...consentFetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(consentLocation)
          },
          devel: "getCrumb-quote-AAPL-collectConsent.html"
        };
        logger2.debug("fetch", consentLocation);
        const collectConsentResponse = await fetch2(consentLocation, collectConsentFetchOptions);
        const collectConsentBody = await collectConsentResponse.text();
        const collectConsentResponseParams = [
          ...collectConsentBody.matchAll(/<input type="hidden" name="([^"]+)" value="([^"]+)">/g)
        ].map(([, name, value]) => `${name}=${encodeURIComponent(parseHtmlEntities(value))}&`).join("") + "agree=agree&agree=agree";
        const collectConsentSubmitFetchOptions = {
          ...consentFetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(consentLocation),
            "content-type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          // body: "csrfToken=XjJfOYU&sessionId=3_cc-session_bd9a3b0c-c1b4-4aa8-8c18-7a82ec68a5d5&originalDoneUrl=https%3A%2F%2Ffinance.yahoo.com%2Fquote%2FAAPL%3Fguccounter%3D1&namespace=yahoo&agree=agree&agree=agree",
          body: collectConsentResponseParams,
          devel: "getCrumb-quote-AAPL-collectConsentSubmit"
        };
        logger2.debug("fetch", consentLocation);
        const collectConsentSubmitResponse = await fetch2(consentLocation, collectConsentSubmitFetchOptions);
        if (!await processSetCookieHeader(collectConsentSubmitResponse.headers.getSetCookie(), consentLocation)) {
          throw new Error("No set-cookie header on collectConsentSubmitResponse, please report.");
        }
        const collectConsentSubmitResponseLocation = collectConsentSubmitResponse.headers.get("location");
        if (!collectConsentSubmitResponseLocation) {
          throw new Error("collectConsentSubmitResponse unexpectedly did not return a Location header, please report.");
        }
        const copyConsentFetchOptions = {
          ...consentFetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(collectConsentSubmitResponseLocation)
          },
          devel: "getCrumb-quote-AAPL-copyConsent"
        };
        logger2.debug("fetch", collectConsentSubmitResponseLocation);
        const copyConsentResponse = await fetch2(collectConsentSubmitResponseLocation, copyConsentFetchOptions);
        if (!await processSetCookieHeader(copyConsentResponse.headers.getSetCookie(), collectConsentSubmitResponseLocation)) {
          throw new Error("No set-cookie header on copyConsentResponse, please report.");
        }
        const copyConsentResponseLocation = copyConsentResponse.headers.get("location");
        if (!copyConsentResponseLocation) {
          throw new Error("collectConsentSubmitResponse unexpectedly did not return a Location header, please report.");
        }
        const finalResponseFetchOptions = {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            cookie: await cookieJar.getCookieString(collectConsentSubmitResponseLocation)
          },
          devel: "getCrumb-quote-AAPL-consent-final-redirect.html"
        };
        return await _getCrumb(cookieJar, fetch2, finalResponseFetchOptions, logger2, copyConsentResponseLocation, "getCrumb-quote-AAPL-consent-final-redirect.html", noCache);
      }
    } else {
      logger2.warn("We expected a redirect to guce.yahoo.com, but got " + location + ". We'll try to continue anyway - you can safely ignore this if the request succeeds");
    }
  }
  const cookie = (await cookieJar.getCookies(url, { expire: true }))[0];
  if (cookie) {
    logger2.debug("Success. Cookie expires on " + cookie.expires);
  } else {
    throw new Error("No set-cookie header present in Yahoo's response.  Something must have changed, please report.");
  }
  const GET_CRUMB_URL = "https://query1.finance.yahoo.com/v1/test/getcrumb";
  const getCrumbOptions = {
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
      // Big thanks to @nocodehummel who figured out a User-Agent that both
      // works but still allows us to identify ourselves honestly.
      "User-Agent": `Mozilla/5.0 (compatible; ${deno_default.name}/${deno_default.version})`,
      cookie: await cookieJar.getCookieString(GET_CRUMB_URL),
      origin: "https://finance.yahoo.com",
      referer: url,
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "text/plain"
    },
    devel: "getCrumb-getcrumb"
  };
  logger2.debug(
    "fetch",
    GET_CRUMB_URL
    /*, getCrumbOptions */
  );
  const getCrumbResponse = await fetch2(GET_CRUMB_URL, getCrumbOptions);
  if (getCrumbResponse.status !== 200) {
    throw new Error("Failed to get crumb, status " + getCrumbResponse.status + ", statusText: " + getCrumbResponse.statusText);
  }
  const crumbFromGetCrumb = await getCrumbResponse.text();
  crumb = crumbFromGetCrumb;
  if (!crumb) {
    throw new Error("Could not find crumb.  Yahoo's API may have changed; please report.");
  }
  logger2.debug("New crumb: " + crumb);
  await cookieJar.setCookie(new import_tough_cookie2.Cookie({
    key: "crumb",
    value: crumb
  }), CONFIG_FAKE_URL);
  promise = null;
  return crumb;
}
var promise = null;
function getCrumb(cookieJar, fetch2, fetchOptionsBase, logger2, url = "https://finance.yahoo.com/quote/AAPL", __getCrumb = _getCrumb) {
  showNotice("yahooSurvey");
  if (!promise) {
    promise = __getCrumb(cookieJar, fetch2, fetchOptionsBase, logger2, url);
  }
  return promise;
}

// node_modules/yahoo-finance2/esm/src/consts.js
var repository = "https://github.com/gadicc/node-yahoo-finance2";

// node_modules/yahoo-finance2/esm/src/lib/yahooFinanceFetch.js
var userAgent = `${deno_default.name}/${deno_default.version} (+${repository})`;
var _queue = new Queue();
function assertQueueOptions(queue, opts) {
  opts;
  if (typeof opts.concurrency === "number" && queue.concurrency !== opts.concurrency) {
    queue.concurrency = opts.concurrency;
  }
  if (typeof opts.timeout === "number" && queue.timeout !== opts.timeout) {
    queue.timeout = opts.timeout;
  }
}
function substituteVariables(urlBase) {
  return urlBase.replace(/\$\{([^}]+)\}/g, (match, varName) => {
    if (varName === "YF_QUERY_HOST") {
      return this._opts.YF_QUERY_HOST || "query2.finance.yahoo.com";
    } else {
      return match;
    }
  });
}
async function yahooFinanceFetch(urlBase, params = {}, moduleOpts = {}, func = "json", needsCrumb = false) {
  if (!(this && this._env)) {
    throw new errors_default.NoEnvironmentError("yahooFinanceFetch called without this._env set");
  }
  const queue = _queue;
  assertQueueOptions(queue, { ...this._opts.queue, ...moduleOpts.queue });
  const { URLSearchParams: URLSearchParams2, fetch: fetch2, fetchDevel } = this._env;
  const fetchFunc = moduleOpts.devel ? await fetchDevel() : fetch2;
  const fetchOptionsBase = {
    ...moduleOpts.fetchOptions,
    devel: moduleOpts.devel,
    headers: {
      "User-Agent": userAgent,
      ...moduleOpts.fetchOptions?.headers
    }
  };
  if (needsCrumb) {
    if (!this._opts.cookieJar)
      throw new Error("No cookieJar set");
    if (!this._opts.logger)
      throw new Error("Logger was unset.");
    const crumb2 = await getCrumb(this._opts.cookieJar, fetchFunc, fetchOptionsBase, this._opts.logger);
    if (crumb2)
      params.crumb = crumb2;
  }
  const urlSearchParams = new URLSearchParams2(params);
  const url = substituteVariables.call(this, urlBase) + "?" + urlSearchParams.toString();
  if (!this._opts.cookieJar)
    throw new Error("No cookieJar set");
  const fetchOptions = {
    ...fetchOptionsBase,
    headers: {
      ...fetchOptionsBase.headers,
      cookie: await this._opts.cookieJar.getCookieString(url, {
        allPaths: true
      })
    }
  };
  if (func === "csv")
    func = "text";
  const response = await queue.add(() => fetchFunc(url, fetchOptions));
  const setCookieHeaders = response.headers.getSetCookie();
  if (setCookieHeaders) {
    if (!this._opts.cookieJar)
      throw new Error("No cookieJar set");
    this._opts.cookieJar.setFromSetCookieHeaders(setCookieHeaders, url);
  }
  const result = await response[func]();
  if (func === "json") {
    const keys = Object.keys(result);
    if (keys.length === 1) {
      const errorObj = result[keys[0]].error;
      if (errorObj) {
        const errorName = errorObj.code.replace(/ /g, "") + "Error";
        const ErrorClass = errors_default[errorName] || Error;
        throw new ErrorClass(errorObj.description);
      }
    }
  }
  if (!response.ok) {
    console.error(url);
    const error = new errors_default.HTTPError(response.statusText);
    error.code = response.status;
    throw error;
  }
  return result;
}
var yahooFinanceFetch_default = yahooFinanceFetch;

// node_modules/yahoo-finance2/esm/_dnt.shims.js
var import_shim_deno = __toESM(require_dist2(), 1);
var import_shim_deno2 = __toESM(require_dist2(), 1);
var dntGlobals = {
  Deno: import_shim_deno.Deno
};
var dntGlobalThis = createMergeProxy(globalThis, dntGlobals);
function createMergeProxy(baseObj, extObj) {
  return new Proxy(baseObj, {
    get(_target, prop, _receiver) {
      if (prop in extObj) {
        return extObj[prop];
      } else {
        return baseObj[prop];
      }
    },
    set(_target, prop, value) {
      if (prop in extObj) {
        delete extObj[prop];
      }
      baseObj[prop] = value;
      return true;
    },
    deleteProperty(_target, prop) {
      let success = false;
      if (prop in extObj) {
        delete extObj[prop];
        success = true;
      }
      if (prop in baseObj) {
        delete baseObj[prop];
        success = true;
      }
      return success;
    },
    ownKeys(_target) {
      const baseKeys = Reflect.ownKeys(baseObj);
      const extKeys = Reflect.ownKeys(extObj);
      const extKeysSet = new Set(extKeys);
      return [...baseKeys.filter((k) => !extKeysSet.has(k)), ...extKeys];
    },
    defineProperty(_target, prop, desc) {
      if (prop in extObj) {
        delete extObj[prop];
      }
      Reflect.defineProperty(baseObj, prop, desc);
      return true;
    },
    getOwnPropertyDescriptor(_target, prop) {
      if (prop in extObj) {
        return Reflect.getOwnPropertyDescriptor(extObj, prop);
      } else {
        return Reflect.getOwnPropertyDescriptor(baseObj, prop);
      }
    },
    has(_target, prop) {
      return prop in extObj || prop in baseObj;
    }
  });
}

// node_modules/yahoo-finance2/esm/schema.js
var schema_default = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$comment": "DO NOT EDIT THIS FILE.  It is generated automatically from typescript interfaces in the project.  To update, run `deno task schema`.",
  "definitions": {
    "YahooFinanceOptions": {
      "type": "object",
      "properties": {
        "YF_QUERY_HOST": {
          "type": "string"
        },
        "queue": {
          "$ref": "#/definitions/QueueOptions"
        },
        "validation": {
          "$ref": "#/definitions/ValidationOptions"
        }
      },
      "additionalProperties": false
    },
    "QueueOptions": {
      "type": "object",
      "properties": {
        "concurrency": {
          "yahooFinanceType": "number"
        },
        "timeout": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": false
    },
    "ValidationOptions": {
      "type": "object",
      "properties": {
        "logErrors": {
          "type": "boolean"
        },
        "logOptionsErrors": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof autoc>": {
      "type": "object",
      "additionalProperties": false
    },
    "ChartResultObject": {
      "type": "object",
      "properties": {
        "meta": {
          "$ref": "#/definitions/ChartMeta"
        },
        "timestamp": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "events": {
          "$ref": "#/definitions/ChartEventsObject"
        },
        "indicators": {
          "$ref": "#/definitions/ChartIndicatorsObject"
        }
      },
      "required": [
        "meta",
        "indicators"
      ],
      "additionalProperties": {}
    },
    "ChartMeta": {
      "type": "object",
      "properties": {
        "currency": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "exchangeName": {
          "type": "string"
        },
        "instrumentType": {
          "type": "string"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "firstTradeDate": {
          "yahooFinanceType": "date|null"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "gmtoffset": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "timezone": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "chartPreviousClose": {
          "yahooFinanceType": "number"
        },
        "previousClose": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "longName": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "scale": {
          "yahooFinanceType": "number"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "currentTradingPeriod": {
          "type": "object",
          "properties": {
            "pre": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            },
            "regular": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            },
            "post": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            }
          },
          "required": [
            "pre",
            "regular",
            "post"
          ],
          "additionalProperties": {}
        },
        "tradingPeriods": {
          "anyOf": [
            {
              "$ref": "#/definitions/ChartMetaTradingPeriods"
            },
            {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/ChartMetaTradingPeriod"
                }
              }
            }
          ]
        },
        "dataGranularity": {
          "type": "string"
        },
        "range": {
          "type": "string"
        },
        "validRanges": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "currency",
        "symbol",
        "exchangeName",
        "instrumentType",
        "firstTradeDate",
        "regularMarketTime",
        "gmtoffset",
        "timezone",
        "exchangeTimezoneName",
        "regularMarketPrice",
        "priceHint",
        "currentTradingPeriod",
        "dataGranularity",
        "range",
        "validRanges"
      ],
      "additionalProperties": {}
    },
    "ChartMetaTradingPeriod": {
      "type": "object",
      "properties": {
        "timezone": {
          "type": "string"
        },
        "start": {
          "yahooFinanceType": "date"
        },
        "end": {
          "yahooFinanceType": "date"
        },
        "gmtoffset": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "timezone",
        "start",
        "end",
        "gmtoffset"
      ],
      "additionalProperties": {}
    },
    "ChartMetaTradingPeriods": {
      "type": "object",
      "properties": {
        "pre": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            }
          }
        },
        "post": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            }
          }
        },
        "regular": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ChartMetaTradingPeriod"
            }
          }
        }
      },
      "additionalProperties": {}
    },
    "ChartEventsObject": {
      "type": "object",
      "properties": {
        "dividends": {
          "$ref": "#/definitions/ChartEventDividends"
        },
        "splits": {
          "$ref": "#/definitions/ChartEventSplits"
        }
      },
      "additionalProperties": {}
    },
    "ChartEventDividends": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/ChartEventDividend"
      }
    },
    "ChartEventDividend": {
      "type": "object",
      "properties": {
        "amount": {
          "yahooFinanceType": "number"
        },
        "date": {
          "yahooFinanceType": "date"
        }
      },
      "required": [
        "amount",
        "date"
      ],
      "additionalProperties": {}
    },
    "ChartEventSplits": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/ChartEventSplit"
      }
    },
    "ChartEventSplit": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "numerator": {
          "yahooFinanceType": "number"
        },
        "denominator": {
          "yahooFinanceType": "number"
        },
        "splitRatio": {
          "type": "string"
        }
      },
      "required": [
        "date",
        "numerator",
        "denominator",
        "splitRatio"
      ],
      "additionalProperties": {}
    },
    "ChartIndicatorsObject": {
      "type": "object",
      "properties": {
        "quote": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ChartIndicatorQuote"
          }
        },
        "adjclose": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ChartIndicatorAdjclose"
          }
        }
      },
      "required": [
        "quote"
      ],
      "additionalProperties": {}
    },
    "ChartIndicatorQuote": {
      "type": "object",
      "properties": {
        "high": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        },
        "low": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        },
        "open": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        },
        "close": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        },
        "volume": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        }
      },
      "required": [
        "high",
        "low",
        "open",
        "close",
        "volume"
      ],
      "additionalProperties": {}
    },
    "ChartIndicatorAdjclose": {
      "type": "object",
      "properties": {
        "adjclose": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number|null"
          }
        }
      },
      "additionalProperties": {}
    },
    "ChartResultArray": {
      "type": "object",
      "properties": {
        "meta": {
          "$ref": "#/definitions/ChartMeta"
        },
        "events": {
          "$ref": "#/definitions/ChartEventsArray"
        },
        "quotes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ChartResultArrayQuote"
          }
        }
      },
      "required": [
        "meta",
        "quotes"
      ],
      "additionalProperties": false
    },
    "ChartEventsArray": {
      "type": "object",
      "properties": {
        "dividends": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ChartEventDividend"
          }
        },
        "splits": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ChartEventSplit"
          }
        }
      },
      "additionalProperties": {}
    },
    "ChartResultArrayQuote": {
      "type": "object",
      "properties": {
        "high": {
          "yahooFinanceType": "number|null"
        },
        "low": {
          "yahooFinanceType": "number|null"
        },
        "open": {
          "yahooFinanceType": "number|null"
        },
        "close": {
          "yahooFinanceType": "number|null"
        },
        "volume": {
          "yahooFinanceType": "number|null"
        },
        "adjclose": {
          "yahooFinanceType": "number|null"
        }
      },
      "required": [
        "high",
        "low",
        "open",
        "close",
        "volume"
      ],
      "additionalProperties": {}
    },
    "ChartOptions": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "period2": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "useYfid": {
          "type": "boolean"
        },
        "interval": {
          "type": "string",
          "enum": [
            "1m",
            "2m",
            "5m",
            "15m",
            "30m",
            "60m",
            "90m",
            "1h",
            "1d",
            "5d",
            "1wk",
            "1mo",
            "3mo"
          ]
        },
        "includePrePost": {
          "type": "boolean"
        },
        "events": {
          "type": "string"
        },
        "lang": {
          "type": "string"
        },
        "return": {
          "type": "string",
          "enum": [
            "array",
            "object"
          ]
        }
      },
      "required": [
        "period1"
      ],
      "additionalProperties": false
    },
    "ChartOptionsWithReturnArray": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "period2": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "useYfid": {
          "type": "boolean"
        },
        "interval": {
          "type": "string",
          "enum": [
            "1m",
            "2m",
            "5m",
            "15m",
            "30m",
            "60m",
            "90m",
            "1h",
            "1d",
            "5d",
            "1wk",
            "1mo",
            "3mo"
          ]
        },
        "includePrePost": {
          "type": "boolean"
        },
        "events": {
          "type": "string"
        },
        "lang": {
          "type": "string"
        },
        "return": {
          "type": "string",
          "const": "array"
        }
      },
      "additionalProperties": false,
      "required": [
        "period1"
      ]
    },
    "ChartOptionsWithReturnObject": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "period2": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "useYfid": {
          "type": "boolean"
        },
        "interval": {
          "type": "string",
          "enum": [
            "1m",
            "2m",
            "5m",
            "15m",
            "30m",
            "60m",
            "90m",
            "1h",
            "1d",
            "5d",
            "1wk",
            "1mo",
            "3mo"
          ]
        },
        "includePrePost": {
          "type": "boolean"
        },
        "events": {
          "type": "string"
        },
        "lang": {
          "type": "string"
        },
        "return": {
          "type": "string",
          "const": "object"
        }
      },
      "required": [
        "period1",
        "return"
      ],
      "additionalProperties": false
    },
    "NamedParameters<typeof chart>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "symbol": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/ChartOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this",
        "symbol",
        "queryOptionsOverrides"
      ],
      "additionalProperties": false
    },
    "ModuleThis": {
      "type": "object",
      "properties": {
        "_moduleExec": {}
      },
      "required": [
        "_moduleExec"
      ]
    },
    "ModuleOptions": {
      "type": "object",
      "properties": {
        "validateResult": {
          "type": "boolean"
        },
        "devel": {
          "type": [
            "boolean",
            "string"
          ]
        },
        "fetchOptions": {
          "type": "object"
        }
      },
      "additionalProperties": false
    },
    "DailyGainersResult": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "canonicalName": {
          "type": "string"
        },
        "criteriaMeta": {
          "$ref": "#/definitions/DailyGainersCriteriaMeta"
        },
        "rawCriteria": {
          "type": "string"
        },
        "start": {
          "yahooFinanceType": "number"
        },
        "count": {
          "yahooFinanceType": "number"
        },
        "total": {
          "yahooFinanceType": "number"
        },
        "quotes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/DailyGainersQuote"
          }
        },
        "useRecords": {
          "type": "boolean"
        },
        "predefinedScr": {
          "type": "boolean"
        },
        "versionId": {
          "yahooFinanceType": "number"
        },
        "creationDate": {
          "yahooFinanceType": "number"
        },
        "lastUpdated": {
          "yahooFinanceType": "number"
        },
        "isPremium": {
          "type": "boolean"
        },
        "iconUrl": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "title",
        "description",
        "canonicalName",
        "criteriaMeta",
        "rawCriteria",
        "start",
        "count",
        "total",
        "quotes",
        "useRecords",
        "predefinedScr",
        "versionId",
        "creationDate",
        "lastUpdated",
        "isPremium",
        "iconUrl"
      ],
      "additionalProperties": false
    },
    "DailyGainersCriteriaMeta": {
      "type": "object",
      "properties": {
        "size": {
          "yahooFinanceType": "number"
        },
        "offset": {
          "yahooFinanceType": "number"
        },
        "sortField": {
          "type": "string"
        },
        "sortType": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "criteria": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/DailyGainersCriterum"
          }
        },
        "topOperator": {
          "type": "string"
        }
      },
      "required": [
        "size",
        "offset",
        "sortField",
        "sortType",
        "quoteType",
        "criteria",
        "topOperator"
      ],
      "additionalProperties": false
    },
    "DailyGainersCriterum": {
      "type": "object",
      "properties": {
        "field": {
          "type": "string"
        },
        "subField": {
          "type": "null"
        },
        "operators": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "values": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "labelsSelected": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "dependentValues": {
          "type": "array",
          "items": {}
        }
      },
      "required": [
        "field",
        "subField",
        "operators",
        "values",
        "labelsSelected",
        "dependentValues"
      ],
      "additionalProperties": false
    },
    "DailyGainersQuote": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "lastCloseTevEbitLtm": {
          "yahooFinanceType": "number"
        },
        "lastClosePriceToNNWCPerShare": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "number"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "number"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "number"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "type": "string"
        },
        "currency": {
          "type": "string"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "number"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "corporateActions": {},
        "earningsCallTimestampStart": {
          "yahooFinanceType": "number"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "number"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "market": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "type": "string"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "number"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "number"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "marketState": {
          "type": "string"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "shortName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "symbol": {
          "type": "string"
        },
        "dividendDate": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "dividendYield": {
          "yahooFinanceType": "number"
        },
        "dividendRate": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "language",
        "region",
        "quoteType",
        "typeDisp",
        "quoteSourceName",
        "triggerable",
        "customPriceAlertConfidence",
        "firstTradeDateMilliseconds",
        "priceHint",
        "regularMarketChange",
        "regularMarketTime",
        "regularMarketPrice",
        "regularMarketDayHigh",
        "regularMarketDayRange",
        "currency",
        "regularMarketDayLow",
        "regularMarketVolume",
        "regularMarketPreviousClose",
        "preMarketChange",
        "preMarketTime",
        "preMarketPrice",
        "preMarketChangePercent",
        "hasPrePostMarketData",
        "corporateActions",
        "market",
        "messageBoardId",
        "fullExchangeName",
        "longName",
        "regularMarketOpen",
        "averageDailyVolume3Month",
        "averageDailyVolume10Day",
        "fiftyTwoWeekLowChange",
        "fiftyTwoWeekLowChangePercent",
        "fiftyTwoWeekRange",
        "fiftyTwoWeekHighChange",
        "fiftyTwoWeekHighChangePercent",
        "fiftyTwoWeekChangePercent",
        "trailingAnnualDividendRate",
        "trailingAnnualDividendYield",
        "marketState",
        "sharesOutstanding",
        "fiftyDayAverage",
        "fiftyDayAverageChange",
        "fiftyDayAverageChangePercent",
        "twoHundredDayAverage",
        "twoHundredDayAverageChange",
        "twoHundredDayAverageChangePercent",
        "marketCap",
        "sourceInterval",
        "exchangeDataDelayedBy",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "gmtOffSetMilliseconds",
        "esgPopulated",
        "tradeable",
        "cryptoTradeable",
        "exchange",
        "fiftyTwoWeekLow",
        "fiftyTwoWeekHigh",
        "shortName",
        "regularMarketChangePercent",
        "symbol"
      ],
      "additionalProperties": false
    },
    "DailyGainersOptions": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "count": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof dailyGainers>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/DailyGainersOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this"
      ],
      "additionalProperties": false
    },
    "NamedParameters<typeof dailyLosers>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/DailyGainersOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this"
      ],
      "additionalProperties": false
    },
    "FundamentalsTimeSeries_Period": {
      "type": "string",
      "enum": [
        "3M",
        "12M"
      ]
    },
    "FundamentalsTimeSeriesFinancialsResult": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "TYPE": {
          "type": "string",
          "const": "FINANCIALS"
        },
        "periodType": {
          "$ref": "#/definitions/FundamentalsTimeSeries_Period"
        },
        "totalRevenue": {
          "yahooFinanceType": "number"
        },
        "operatingRevenue": {
          "yahooFinanceType": "number"
        },
        "costOfRevenue": {
          "yahooFinanceType": "number"
        },
        "grossProfit": {
          "yahooFinanceType": "number"
        },
        "sellingGeneralAndAdministration": {
          "yahooFinanceType": "number"
        },
        "sellingAndMarketingExpense": {
          "yahooFinanceType": "number"
        },
        "generalAndAdministrativeExpense": {
          "yahooFinanceType": "number"
        },
        "otherGandA": {
          "yahooFinanceType": "number"
        },
        "researchAndDevelopment": {
          "yahooFinanceType": "number"
        },
        "depreciationAmortizationDepletionIncomeStatement": {
          "yahooFinanceType": "number"
        },
        "depletionIncomeStatement": {
          "yahooFinanceType": "number"
        },
        "depreciationAndAmortizationInIncomeStatement": {
          "yahooFinanceType": "number"
        },
        "amortization": {
          "yahooFinanceType": "number"
        },
        "amortizationOfIntangiblesIncomeStatement": {
          "yahooFinanceType": "number"
        },
        "depreciationIncomeStatement": {
          "yahooFinanceType": "number"
        },
        "otherOperatingExpenses": {
          "yahooFinanceType": "number"
        },
        "operatingExpense": {
          "yahooFinanceType": "number"
        },
        "operatingIncome": {
          "yahooFinanceType": "number"
        },
        "interestExpenseNonOperating": {
          "yahooFinanceType": "number"
        },
        "interestIncomeNonOperating": {
          "yahooFinanceType": "number"
        },
        "totalOtherFinanceCost": {
          "yahooFinanceType": "number"
        },
        "netNonOperatingInterestIncomeExpense": {
          "yahooFinanceType": "number"
        },
        "writeOff": {
          "yahooFinanceType": "number"
        },
        "specialIncomeCharges": {
          "yahooFinanceType": "number"
        },
        "gainOnSaleOfPPE": {
          "yahooFinanceType": "number"
        },
        "gainOnSaleOfBusiness": {
          "yahooFinanceType": "number"
        },
        "gainOnSaleOfSecurity": {
          "yahooFinanceType": "number"
        },
        "otherSpecialCharges": {
          "yahooFinanceType": "number"
        },
        "otherIncomeExpense": {
          "yahooFinanceType": "number"
        },
        "otherNonOperatingIncomeExpenses": {
          "yahooFinanceType": "number"
        },
        "totalExpenses": {
          "yahooFinanceType": "number"
        },
        "pretaxIncome": {
          "yahooFinanceType": "number"
        },
        "taxProvision": {
          "yahooFinanceType": "number"
        },
        "netIncomeContinuousOperations": {
          "yahooFinanceType": "number"
        },
        "netIncomeIncludingNoncontrollingInterests": {
          "yahooFinanceType": "number"
        },
        "minorityInterests": {
          "yahooFinanceType": "number"
        },
        "netIncomeFromTaxLossCarryforward": {
          "yahooFinanceType": "number"
        },
        "netIncomeExtraordinary": {
          "yahooFinanceType": "number"
        },
        "netIncomeDiscontinuousOperations": {
          "yahooFinanceType": "number"
        },
        "preferredStockDividends": {
          "yahooFinanceType": "number"
        },
        "otherunderPreferredStockDividend": {
          "yahooFinanceType": "number"
        },
        "netIncomeCommonStockholders": {
          "yahooFinanceType": "number"
        },
        "netIncome": {
          "yahooFinanceType": "number"
        },
        "basicAverageShares": {
          "yahooFinanceType": "number"
        },
        "dilutedAverageShares": {
          "yahooFinanceType": "number"
        },
        "dividendPerShare": {
          "yahooFinanceType": "number"
        },
        "reportedNormalizedBasicEPS": {
          "yahooFinanceType": "number"
        },
        "continuingAndDiscontinuedBasicEPS": {
          "yahooFinanceType": "number"
        },
        "basicEPSOtherGainsLosses": {
          "yahooFinanceType": "number"
        },
        "taxLossCarryforwardBasicEPS": {
          "yahooFinanceType": "number"
        },
        "normalizedBasicEPS": {
          "yahooFinanceType": "number"
        },
        "basicEPS": {
          "yahooFinanceType": "number"
        },
        "basicAccountingChange": {
          "yahooFinanceType": "number"
        },
        "basicExtraordinary": {
          "yahooFinanceType": "number"
        },
        "basicDiscontinuousOperations": {
          "yahooFinanceType": "number"
        },
        "basicContinuousOperations": {
          "yahooFinanceType": "number"
        },
        "reportedNormalizedDilutedEPS": {
          "yahooFinanceType": "number"
        },
        "continuingAndDiscontinuedDilutedEPS": {
          "yahooFinanceType": "number"
        },
        "taxLossCarryforwardDilutedEPS": {
          "yahooFinanceType": "number"
        },
        "averageDilutionEarnings": {
          "yahooFinanceType": "number"
        },
        "normalizedDilutedEPS": {
          "yahooFinanceType": "number"
        },
        "dilutedEPS": {
          "yahooFinanceType": "number"
        },
        "dilutedAccountingChange": {
          "yahooFinanceType": "number"
        },
        "dilutedExtraordinary": {
          "yahooFinanceType": "number"
        },
        "dilutedContinuousOperations": {
          "yahooFinanceType": "number"
        },
        "dilutedDiscontinuousOperations": {
          "yahooFinanceType": "number"
        },
        "dilutedNIAvailtoComStockholders": {
          "yahooFinanceType": "number"
        },
        "dilutedEPSOtherGainsLosses": {
          "yahooFinanceType": "number"
        },
        "totalOperatingIncomeAsReported": {
          "yahooFinanceType": "number"
        },
        "netIncomeFromContinuingAndDiscontinuedOperation": {
          "yahooFinanceType": "number"
        },
        "normalizedIncome": {
          "yahooFinanceType": "number"
        },
        "netInterestIncome": {
          "yahooFinanceType": "number"
        },
        "EBIT": {
          "yahooFinanceType": "number"
        },
        "EBITDA": {
          "yahooFinanceType": "number"
        },
        "reconciledCostOfRevenue": {
          "yahooFinanceType": "number"
        },
        "reconciledDepreciation": {
          "yahooFinanceType": "number"
        },
        "netIncomeFromContinuingOperationNetMinorityInterest": {
          "yahooFinanceType": "number"
        },
        "totalUnusualItemsExcludingGoodwill": {
          "yahooFinanceType": "number"
        },
        "totalUnusualItems": {
          "yahooFinanceType": "number"
        },
        "normalizedEBITDA": {
          "yahooFinanceType": "number"
        },
        "taxRateForCalcs": {
          "yahooFinanceType": "number"
        },
        "taxEffectOfUnusualItems": {
          "yahooFinanceType": "number"
        },
        "rentExpenseSupplemental": {
          "yahooFinanceType": "number"
        },
        "earningsFromEquityInterestNetOfTax": {
          "yahooFinanceType": "number"
        },
        "impairmentOfCapitalAssets": {
          "yahooFinanceType": "number"
        },
        "restructuringAndMergernAcquisition": {
          "yahooFinanceType": "number"
        },
        "securitiesAmortization": {
          "yahooFinanceType": "number"
        },
        "earningsFromEquityInterest": {
          "yahooFinanceType": "number"
        },
        "otherTaxes": {
          "yahooFinanceType": "number"
        },
        "provisionForDoubtfulAccounts": {
          "yahooFinanceType": "number"
        },
        "insuranceAndClaims": {
          "yahooFinanceType": "number"
        },
        "rentAndLandingFees": {
          "yahooFinanceType": "number"
        },
        "salariesAndWages": {
          "yahooFinanceType": "number"
        },
        "exciseTaxes": {
          "yahooFinanceType": "number"
        },
        "interestExpense": {
          "yahooFinanceType": "number"
        },
        "interestIncome": {
          "yahooFinanceType": "number"
        },
        "totalMoneyMarketInvestments": {
          "yahooFinanceType": "number"
        },
        "interestIncomeAfterProvisionForLoanLoss": {
          "yahooFinanceType": "number"
        },
        "otherThanPreferredStockDividend": {
          "yahooFinanceType": "number"
        },
        "lossonExtinguishmentofDebt": {
          "yahooFinanceType": "number"
        },
        "incomefromAssociatesandOtherParticipatingInterests": {
          "yahooFinanceType": "number"
        },
        "nonInterestExpense": {
          "yahooFinanceType": "number"
        },
        "otherNonInterestExpense": {
          "yahooFinanceType": "number"
        },
        "professionalExpenseAndContractServicesExpense": {
          "yahooFinanceType": "number"
        },
        "occupancyAndEquipment": {
          "yahooFinanceType": "number"
        },
        "equipment": {
          "yahooFinanceType": "number"
        },
        "netOccupancyExpense": {
          "yahooFinanceType": "number"
        },
        "creditLossesProvision": {
          "yahooFinanceType": "number"
        },
        "nonInterestIncome": {
          "yahooFinanceType": "number"
        },
        "otherNonInterestIncome": {
          "yahooFinanceType": "number"
        },
        "gainLossonSaleofAssets": {
          "yahooFinanceType": "number"
        },
        "gainonSaleofInvestmentProperty": {
          "yahooFinanceType": "number"
        },
        "gainonSaleofLoans": {
          "yahooFinanceType": "number"
        },
        "foreignExchangeTradingGains": {
          "yahooFinanceType": "number"
        },
        "tradingGainLoss": {
          "yahooFinanceType": "number"
        },
        "investmentBankingProfit": {
          "yahooFinanceType": "number"
        },
        "dividendIncome": {
          "yahooFinanceType": "number"
        },
        "feesAndCommissions": {
          "yahooFinanceType": "number"
        },
        "feesandCommissionExpense": {
          "yahooFinanceType": "number"
        },
        "feesandCommissionIncome": {
          "yahooFinanceType": "number"
        },
        "otherCustomerServices": {
          "yahooFinanceType": "number"
        },
        "creditCard": {
          "yahooFinanceType": "number"
        },
        "securitiesActivities": {
          "yahooFinanceType": "number"
        },
        "trustFeesbyCommissions": {
          "yahooFinanceType": "number"
        },
        "serviceChargeOnDepositorAccounts": {
          "yahooFinanceType": "number"
        },
        "totalPremiumsEarned": {
          "yahooFinanceType": "number"
        },
        "otherInterestExpense": {
          "yahooFinanceType": "number"
        },
        "interestExpenseForFederalFundsSoldAndSecuritiesPurchaseUnderAgreementsToResell": {
          "yahooFinanceType": "number"
        },
        "interestExpenseForLongTermDebtAndCapitalSecurities": {
          "yahooFinanceType": "number"
        },
        "interestExpenseForShortTermDebt": {
          "yahooFinanceType": "number"
        },
        "interestExpenseForDeposit": {
          "yahooFinanceType": "number"
        },
        "otherInterestIncome": {
          "yahooFinanceType": "number"
        },
        "interestIncomeFromFederalFundsSoldAndSecuritiesPurchaseUnderAgreementsToResell": {
          "yahooFinanceType": "number"
        },
        "interestIncomeFromDeposits": {
          "yahooFinanceType": "number"
        },
        "interestIncomeFromSecurities": {
          "yahooFinanceType": "number"
        },
        "interestIncomeFromLoansAndLease": {
          "yahooFinanceType": "number"
        },
        "interestIncomeFromLeases": {
          "yahooFinanceType": "number"
        },
        "interestIncomeFromLoans": {
          "yahooFinanceType": "number"
        },
        "depreciationDepreciationIncomeStatement": {
          "yahooFinanceType": "number"
        },
        "operationAndMaintenance": {
          "yahooFinanceType": "number"
        },
        "otherCostofRevenue": {
          "yahooFinanceType": "number"
        },
        "explorationDevelopmentAndMineralPropertyLeaseExpenses": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "date",
        "TYPE",
        "periodType"
      ],
      "additionalProperties": false
    },
    "FundamentalsTimeSeriesBalanceSheetResult": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "TYPE": {
          "type": "string",
          "const": "BALANCE_SHEET"
        },
        "periodType": {
          "$ref": "#/definitions/FundamentalsTimeSeries_Period"
        },
        "netDebt": {
          "yahooFinanceType": "number"
        },
        "treasurySharesNumber": {
          "yahooFinanceType": "number"
        },
        "preferredSharesNumber": {
          "yahooFinanceType": "number"
        },
        "ordinarySharesNumber": {
          "yahooFinanceType": "number"
        },
        "shareIssued": {
          "yahooFinanceType": "number"
        },
        "totalDebt": {
          "yahooFinanceType": "number"
        },
        "tangibleBookValue": {
          "yahooFinanceType": "number"
        },
        "investedCapital": {
          "yahooFinanceType": "number"
        },
        "workingCapital": {
          "yahooFinanceType": "number"
        },
        "netTangibleAssets": {
          "yahooFinanceType": "number"
        },
        "capitalLeaseObligations": {
          "yahooFinanceType": "number"
        },
        "commonStockEquity": {
          "yahooFinanceType": "number"
        },
        "preferredStockEquity": {
          "yahooFinanceType": "number"
        },
        "totalCapitalization": {
          "yahooFinanceType": "number"
        },
        "totalEquityGrossMinorityInterest": {
          "yahooFinanceType": "number"
        },
        "minorityInterest": {
          "yahooFinanceType": "number"
        },
        "stockholdersEquity": {
          "yahooFinanceType": "number"
        },
        "otherEquityInterest": {
          "yahooFinanceType": "number"
        },
        "gainsLossesNotAffectingRetainedEarnings": {
          "yahooFinanceType": "number"
        },
        "otherEquityAdjustments": {
          "yahooFinanceType": "number"
        },
        "fixedAssetsRevaluationReserve": {
          "yahooFinanceType": "number"
        },
        "foreignCurrencyTranslationAdjustments": {
          "yahooFinanceType": "number"
        },
        "minimumPensionLiabilities": {
          "yahooFinanceType": "number"
        },
        "unrealizedGainLoss": {
          "yahooFinanceType": "number"
        },
        "treasuryStock": {
          "yahooFinanceType": "number"
        },
        "retainedEarnings": {
          "yahooFinanceType": "number"
        },
        "additionalPaidInCapital": {
          "yahooFinanceType": "number"
        },
        "capitalStock": {
          "yahooFinanceType": "number"
        },
        "otherCapitalStock": {
          "yahooFinanceType": "number"
        },
        "commonStock": {
          "yahooFinanceType": "number"
        },
        "preferredStock": {
          "yahooFinanceType": "number"
        },
        "totalPartnershipCapital": {
          "yahooFinanceType": "number"
        },
        "generalPartnershipCapital": {
          "yahooFinanceType": "number"
        },
        "limitedPartnershipCapital": {
          "yahooFinanceType": "number"
        },
        "totalLiabilitiesNetMinorityInterest": {
          "yahooFinanceType": "number"
        },
        "totalNonCurrentLiabilitiesNetMinorityInterest": {
          "yahooFinanceType": "number"
        },
        "otherNonCurrentLiabilities": {
          "yahooFinanceType": "number"
        },
        "liabilitiesHeldforSaleNonCurrent": {
          "yahooFinanceType": "number"
        },
        "restrictedCommonStock": {
          "yahooFinanceType": "number"
        },
        "preferredSecuritiesOutsideStockEquity": {
          "yahooFinanceType": "number"
        },
        "derivativeProductLiabilities": {
          "yahooFinanceType": "number"
        },
        "employeeBenefits": {
          "yahooFinanceType": "number"
        },
        "nonCurrentPensionAndOtherPostretirementBenefitPlans": {
          "yahooFinanceType": "number"
        },
        "nonCurrentAccruedExpenses": {
          "yahooFinanceType": "number"
        },
        "duetoRelatedPartiesNonCurrent": {
          "yahooFinanceType": "number"
        },
        "tradeandOtherPayablesNonCurrent": {
          "yahooFinanceType": "number"
        },
        "nonCurrentDeferredLiabilities": {
          "yahooFinanceType": "number"
        },
        "nonCurrentDeferredRevenue": {
          "yahooFinanceType": "number"
        },
        "nonCurrentDeferredTaxesLiabilities": {
          "yahooFinanceType": "number"
        },
        "longTermDebtAndCapitalLeaseObligation": {
          "yahooFinanceType": "number"
        },
        "longTermCapitalLeaseObligation": {
          "yahooFinanceType": "number"
        },
        "longTermDebt": {
          "yahooFinanceType": "number"
        },
        "longTermProvisions": {
          "yahooFinanceType": "number"
        },
        "currentLiabilities": {
          "yahooFinanceType": "number"
        },
        "otherCurrentLiabilities": {
          "yahooFinanceType": "number"
        },
        "currentDeferredLiabilities": {
          "yahooFinanceType": "number"
        },
        "currentDeferredRevenue": {
          "yahooFinanceType": "number"
        },
        "currentDeferredTaxesLiabilities": {
          "yahooFinanceType": "number"
        },
        "currentDebtAndCapitalLeaseObligation": {
          "yahooFinanceType": "number"
        },
        "currentCapitalLeaseObligation": {
          "yahooFinanceType": "number"
        },
        "currentDebt": {
          "yahooFinanceType": "number"
        },
        "otherCurrentBorrowings": {
          "yahooFinanceType": "number"
        },
        "lineOfCredit": {
          "yahooFinanceType": "number"
        },
        "commercialPaper": {
          "yahooFinanceType": "number"
        },
        "currentNotesPayable": {
          "yahooFinanceType": "number"
        },
        "pensionandOtherPostRetirementBenefitPlansCurrent": {
          "yahooFinanceType": "number"
        },
        "currentProvisions": {
          "yahooFinanceType": "number"
        },
        "payablesAndAccruedExpenses": {
          "yahooFinanceType": "number"
        },
        "currentAccruedExpenses": {
          "yahooFinanceType": "number"
        },
        "interestPayable": {
          "yahooFinanceType": "number"
        },
        "payables": {
          "yahooFinanceType": "number"
        },
        "otherPayable": {
          "yahooFinanceType": "number"
        },
        "duetoRelatedPartiesCurrent": {
          "yahooFinanceType": "number"
        },
        "dividendsPayable": {
          "yahooFinanceType": "number"
        },
        "totalTaxPayable": {
          "yahooFinanceType": "number"
        },
        "incomeTaxPayable": {
          "yahooFinanceType": "number"
        },
        "accountsPayable": {
          "yahooFinanceType": "number"
        },
        "totalAssets": {
          "yahooFinanceType": "number"
        },
        "totalNonCurrentAssets": {
          "yahooFinanceType": "number"
        },
        "otherNonCurrentAssets": {
          "yahooFinanceType": "number"
        },
        "definedPensionBenefit": {
          "yahooFinanceType": "number"
        },
        "nonCurrentPrepaidAssets": {
          "yahooFinanceType": "number"
        },
        "nonCurrentDeferredAssets": {
          "yahooFinanceType": "number"
        },
        "nonCurrentDeferredTaxesAssets": {
          "yahooFinanceType": "number"
        },
        "duefromRelatedPartiesNonCurrent": {
          "yahooFinanceType": "number"
        },
        "nonCurrentNoteReceivables": {
          "yahooFinanceType": "number"
        },
        "nonCurrentAccountsReceivable": {
          "yahooFinanceType": "number"
        },
        "financialAssets": {
          "yahooFinanceType": "number"
        },
        "investmentsAndAdvances": {
          "yahooFinanceType": "number"
        },
        "otherInvestments": {
          "yahooFinanceType": "number"
        },
        "investmentinFinancialAssets": {
          "yahooFinanceType": "number"
        },
        "heldToMaturitySecurities": {
          "yahooFinanceType": "number"
        },
        "availableForSaleSecurities": {
          "yahooFinanceType": "number"
        },
        "financialAssetsDesignatedasFairValueThroughProfitorLossTotal": {
          "yahooFinanceType": "number"
        },
        "tradingSecurities": {
          "yahooFinanceType": "number"
        },
        "longTermEquityInvestment": {
          "yahooFinanceType": "number"
        },
        "investmentsinJointVenturesatCost": {
          "yahooFinanceType": "number"
        },
        "investmentsInOtherVenturesUnderEquityMethod": {
          "yahooFinanceType": "number"
        },
        "investmentsinAssociatesatCost": {
          "yahooFinanceType": "number"
        },
        "investmentsinSubsidiariesatCost": {
          "yahooFinanceType": "number"
        },
        "investmentProperties": {
          "yahooFinanceType": "number"
        },
        "goodwillAndOtherIntangibleAssets": {
          "yahooFinanceType": "number"
        },
        "otherIntangibleAssets": {
          "yahooFinanceType": "number"
        },
        "goodwill": {
          "yahooFinanceType": "number"
        },
        "netPPE": {
          "yahooFinanceType": "number"
        },
        "accumulatedDepreciation": {
          "yahooFinanceType": "number"
        },
        "grossPPE": {
          "yahooFinanceType": "number"
        },
        "leases": {
          "yahooFinanceType": "number"
        },
        "constructionInProgress": {
          "yahooFinanceType": "number"
        },
        "otherProperties": {
          "yahooFinanceType": "number"
        },
        "machineryFurnitureEquipment": {
          "yahooFinanceType": "number"
        },
        "buildingsAndImprovements": {
          "yahooFinanceType": "number"
        },
        "landAndImprovements": {
          "yahooFinanceType": "number"
        },
        "properties": {
          "yahooFinanceType": "number"
        },
        "currentAssets": {
          "yahooFinanceType": "number"
        },
        "otherCurrentAssets": {
          "yahooFinanceType": "number"
        },
        "hedgingAssetsCurrent": {
          "yahooFinanceType": "number"
        },
        "assetsHeldForSaleCurrent": {
          "yahooFinanceType": "number"
        },
        "currentDeferredAssets": {
          "yahooFinanceType": "number"
        },
        "currentDeferredTaxesAssets": {
          "yahooFinanceType": "number"
        },
        "restrictedCash": {
          "yahooFinanceType": "number"
        },
        "prepaidAssets": {
          "yahooFinanceType": "number"
        },
        "inventory": {
          "yahooFinanceType": "number"
        },
        "inventoriesAdjustmentsAllowances": {
          "yahooFinanceType": "number"
        },
        "otherInventories": {
          "yahooFinanceType": "number"
        },
        "finishedGoods": {
          "yahooFinanceType": "number"
        },
        "workInProcess": {
          "yahooFinanceType": "number"
        },
        "rawMaterials": {
          "yahooFinanceType": "number"
        },
        "receivables": {
          "yahooFinanceType": "number"
        },
        "receivablesAdjustmentsAllowances": {
          "yahooFinanceType": "number"
        },
        "otherReceivables": {
          "yahooFinanceType": "number"
        },
        "duefromRelatedPartiesCurrent": {
          "yahooFinanceType": "number"
        },
        "taxesReceivable": {
          "yahooFinanceType": "number"
        },
        "accruedInterestReceivable": {
          "yahooFinanceType": "number"
        },
        "notesReceivable": {
          "yahooFinanceType": "number"
        },
        "loansReceivable": {
          "yahooFinanceType": "number"
        },
        "accountsReceivable": {
          "yahooFinanceType": "number"
        },
        "allowanceForDoubtfulAccountsReceivable": {
          "yahooFinanceType": "number"
        },
        "grossAccountsReceivable": {
          "yahooFinanceType": "number"
        },
        "cashCashEquivalentsAndShortTermInvestments": {
          "yahooFinanceType": "number"
        },
        "otherShortTermInvestments": {
          "yahooFinanceType": "number"
        },
        "cashAndCashEquivalents": {
          "yahooFinanceType": "number"
        },
        "cashEquivalents": {
          "yahooFinanceType": "number"
        },
        "cashFinancial": {
          "yahooFinanceType": "number"
        },
        "otherLiabilities": {
          "yahooFinanceType": "number"
        },
        "liabilitiesOfDiscontinuedOperations": {
          "yahooFinanceType": "number"
        },
        "subordinatedLiabilities": {
          "yahooFinanceType": "number"
        },
        "advanceFromFederalHomeLoanBanks": {
          "yahooFinanceType": "number"
        },
        "tradingLiabilities": {
          "yahooFinanceType": "number"
        },
        "duetoRelatedParties": {
          "yahooFinanceType": "number"
        },
        "securitiesLoaned": {
          "yahooFinanceType": "number"
        },
        "federalFundsPurchasedAndSecuritiesSoldUnderAgreementToRepurchase": {
          "yahooFinanceType": "number"
        },
        "financialInstrumentsSoldUnderAgreementsToRepurchase": {
          "yahooFinanceType": "number"
        },
        "federalFundsPurchased": {
          "yahooFinanceType": "number"
        },
        "totalDeposits": {
          "yahooFinanceType": "number"
        },
        "nonInterestBearingDeposits": {
          "yahooFinanceType": "number"
        },
        "interestBearingDepositsLiabilities": {
          "yahooFinanceType": "number"
        },
        "customerAccounts": {
          "yahooFinanceType": "number"
        },
        "depositsbyBank": {
          "yahooFinanceType": "number"
        },
        "otherAssets": {
          "yahooFinanceType": "number"
        },
        "assetsHeldForSale": {
          "yahooFinanceType": "number"
        },
        "deferredAssets": {
          "yahooFinanceType": "number"
        },
        "deferredTaxAssets": {
          "yahooFinanceType": "number"
        },
        "dueFromRelatedParties": {
          "yahooFinanceType": "number"
        },
        "allowanceForNotesReceivable": {
          "yahooFinanceType": "number"
        },
        "grossNotesReceivable": {
          "yahooFinanceType": "number"
        },
        "netLoan": {
          "yahooFinanceType": "number"
        },
        "unearnedIncome": {
          "yahooFinanceType": "number"
        },
        "allowanceForLoansAndLeaseLosses": {
          "yahooFinanceType": "number"
        },
        "grossLoan": {
          "yahooFinanceType": "number"
        },
        "otherLoanAssets": {
          "yahooFinanceType": "number"
        },
        "mortgageLoan": {
          "yahooFinanceType": "number"
        },
        "consumerLoan": {
          "yahooFinanceType": "number"
        },
        "commercialLoan": {
          "yahooFinanceType": "number"
        },
        "loansHeldForSale": {
          "yahooFinanceType": "number"
        },
        "derivativeAssets": {
          "yahooFinanceType": "number"
        },
        "securitiesAndInvestments": {
          "yahooFinanceType": "number"
        },
        "bankOwnedLifeInsurance": {
          "yahooFinanceType": "number"
        },
        "otherRealEstateOwned": {
          "yahooFinanceType": "number"
        },
        "foreclosedAssets": {
          "yahooFinanceType": "number"
        },
        "customerAcceptances": {
          "yahooFinanceType": "number"
        },
        "federalHomeLoanBankStock": {
          "yahooFinanceType": "number"
        },
        "securityBorrowed": {
          "yahooFinanceType": "number"
        },
        "cashCashEquivalentsAndFederalFundsSold": {
          "yahooFinanceType": "number"
        },
        "moneyMarketInvestments": {
          "yahooFinanceType": "number"
        },
        "federalFundsSoldAndSecuritiesPurchaseUnderAgreementsToResell": {
          "yahooFinanceType": "number"
        },
        "securityAgreeToBeResell": {
          "yahooFinanceType": "number"
        },
        "federalFundsSold": {
          "yahooFinanceType": "number"
        },
        "restrictedCashAndInvestments": {
          "yahooFinanceType": "number"
        },
        "restrictedInvestments": {
          "yahooFinanceType": "number"
        },
        "restrictedCashAndCashEquivalents": {
          "yahooFinanceType": "number"
        },
        "interestBearingDepositsAssets": {
          "yahooFinanceType": "number"
        },
        "cashAndDueFromBanks": {
          "yahooFinanceType": "number"
        },
        "bankIndebtedness": {
          "yahooFinanceType": "number"
        },
        "mineralProperties": {
          "yahooFinanceType": "number"
        },
        "netPPEPurchaseAndSale": {
          "yahooFinanceType": "number"
        },
        "purchaseOfInvestment": {
          "yahooFinanceType": "number"
        },
        "investingCashFlow": {
          "yahooFinanceType": "number"
        },
        "grossProfit": {
          "yahooFinanceType": "number"
        },
        "cashFlowFromContinuingOperatingActivities": {
          "yahooFinanceType": "number"
        },
        "endCashPosition": {
          "yahooFinanceType": "number"
        },
        "netIncomeCommonStockholders": {
          "yahooFinanceType": "number"
        },
        "changeInAccountPayable": {
          "yahooFinanceType": "number"
        },
        "otherNonCashItems": {
          "yahooFinanceType": "number"
        },
        "cashDividendsPaid": {
          "yahooFinanceType": "number"
        },
        "dilutedAverageShares": {
          "yahooFinanceType": "number"
        },
        "repurchaseOfCapitalStock": {
          "yahooFinanceType": "number"
        },
        "EBITDA": {
          "yahooFinanceType": "number"
        },
        "stockBasedCompensation": {
          "yahooFinanceType": "number"
        },
        "commonStockDividendPaid": {
          "yahooFinanceType": "number"
        },
        "changeInPayable": {
          "yahooFinanceType": "number"
        },
        "costOfRevenue": {
          "yahooFinanceType": "number"
        },
        "operatingExpense": {
          "yahooFinanceType": "number"
        },
        "changeInInventory": {
          "yahooFinanceType": "number"
        },
        "normalizedIncome": {
          "yahooFinanceType": "number"
        },
        "netIncomeIncludingNoncontrollingInterests": {
          "yahooFinanceType": "number"
        },
        "netIncomeFromContinuingOperationNetMinorityInterest": {
          "yahooFinanceType": "number"
        },
        "reconciledCostOfRevenue": {
          "yahooFinanceType": "number"
        },
        "otherIncomeExpense": {
          "yahooFinanceType": "number"
        },
        "netInvestmentPurchaseAndSale": {
          "yahooFinanceType": "number"
        },
        "purchaseOfPPE": {
          "yahooFinanceType": "number"
        },
        "taxProvision": {
          "yahooFinanceType": "number"
        },
        "pretaxIncome": {
          "yahooFinanceType": "number"
        },
        "researchAndDevelopment": {
          "yahooFinanceType": "number"
        },
        "longTermDebtPayments": {
          "yahooFinanceType": "number"
        },
        "changeInReceivables": {
          "yahooFinanceType": "number"
        },
        "dilutedEPS": {
          "yahooFinanceType": "number"
        },
        "netIssuancePaymentsOfDebt": {
          "yahooFinanceType": "number"
        },
        "netShortTermDebtIssuance": {
          "yahooFinanceType": "number"
        },
        "depreciationAndAmortization": {
          "yahooFinanceType": "number"
        },
        "cashFlowFromContinuingInvestingActivities": {
          "yahooFinanceType": "number"
        },
        "beginningCashPosition": {
          "yahooFinanceType": "number"
        },
        "changesInCash": {
          "yahooFinanceType": "number"
        },
        "financingCashFlow": {
          "yahooFinanceType": "number"
        },
        "changeInOtherCurrentLiabilities": {
          "yahooFinanceType": "number"
        },
        "changeInWorkingCapital": {
          "yahooFinanceType": "number"
        },
        "operatingIncome": {
          "yahooFinanceType": "number"
        },
        "totalRevenue": {
          "yahooFinanceType": "number"
        },
        "netIncomeFromContinuingAndDiscontinuedOperation": {
          "yahooFinanceType": "number"
        },
        "operatingRevenue": {
          "yahooFinanceType": "number"
        },
        "changeInPayablesAndAccruedExpense": {
          "yahooFinanceType": "number"
        },
        "netCommonStockIssuance": {
          "yahooFinanceType": "number"
        },
        "commonStockPayments": {
          "yahooFinanceType": "number"
        },
        "EBIT": {
          "yahooFinanceType": "number"
        },
        "netOtherInvestingChanges": {
          "yahooFinanceType": "number"
        },
        "basicEPS": {
          "yahooFinanceType": "number"
        },
        "shortTermDebtPayments": {
          "yahooFinanceType": "number"
        },
        "sellingGeneralAndAdministration": {
          "yahooFinanceType": "number"
        },
        "netIncomeContinuousOperations": {
          "yahooFinanceType": "number"
        },
        "repaymentOfDebt": {
          "yahooFinanceType": "number"
        },
        "totalOperatingIncomeAsReported": {
          "yahooFinanceType": "number"
        },
        "normalizedEBITDA": {
          "yahooFinanceType": "number"
        },
        "capitalExpenditure": {
          "yahooFinanceType": "number"
        },
        "cashFlowFromContinuingFinancingActivities": {
          "yahooFinanceType": "number"
        },
        "netIncome": {
          "yahooFinanceType": "number"
        },
        "netOtherFinancingCharges": {
          "yahooFinanceType": "number"
        },
        "basicAverageShares": {
          "yahooFinanceType": "number"
        },
        "netLongTermDebtIssuance": {
          "yahooFinanceType": "number"
        },
        "depreciationAmortizationDepletion": {
          "yahooFinanceType": "number"
        },
        "operatingCashFlow": {
          "yahooFinanceType": "number"
        },
        "dilutedNIAvailtoComStockholders": {
          "yahooFinanceType": "number"
        },
        "netIncomeFromContinuingOperations": {
          "yahooFinanceType": "number"
        },
        "taxRateForCalcs": {
          "yahooFinanceType": "number"
        },
        "freeCashFlow": {
          "yahooFinanceType": "number"
        },
        "otherNonOperatingIncomeExpenses": {
          "yahooFinanceType": "number"
        },
        "changesInAccountReceivables": {
          "yahooFinanceType": "number"
        },
        "totalExpenses": {
          "yahooFinanceType": "number"
        },
        "changeInOtherCurrentAssets": {
          "yahooFinanceType": "number"
        },
        "reconciledDepreciation": {
          "yahooFinanceType": "number"
        },
        "incomeTaxPaidSupplementalData": {
          "yahooFinanceType": "number"
        },
        "saleOfInvestment": {
          "yahooFinanceType": "number"
        },
        "interestPaidSupplementalData": {
          "yahooFinanceType": "number"
        },
        "deferredTax": {
          "yahooFinanceType": "number"
        },
        "changeInOtherWorkingCapital": {
          "yahooFinanceType": "number"
        },
        "interestIncomeNonOperating": {
          "yahooFinanceType": "number"
        },
        "issuanceOfDebt": {
          "yahooFinanceType": "number"
        },
        "purchaseOfBusiness": {
          "yahooFinanceType": "number"
        },
        "longTermDebtIssuance": {
          "yahooFinanceType": "number"
        },
        "interestIncome": {
          "yahooFinanceType": "number"
        },
        "netInterestIncome": {
          "yahooFinanceType": "number"
        },
        "deferredIncomeTax": {
          "yahooFinanceType": "number"
        },
        "interestExpense": {
          "yahooFinanceType": "number"
        },
        "netNonOperatingInterestIncomeExpense": {
          "yahooFinanceType": "number"
        },
        "interestExpenseNonOperating": {
          "yahooFinanceType": "number"
        },
        "netBusinessPurchaseAndSale": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "date",
        "TYPE",
        "periodType"
      ],
      "additionalProperties": false
    },
    "FundamentalsTimeSeriesCashFlowResult": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "TYPE": {
          "type": "string",
          "const": "CASH_FLOW"
        },
        "periodType": {
          "$ref": "#/definitions/FundamentalsTimeSeries_Period"
        },
        "freeCashFlow": {
          "yahooFinanceType": "number"
        },
        "foreignSales": {
          "yahooFinanceType": "number"
        },
        "domesticSales": {
          "yahooFinanceType": "number"
        },
        "adjustedGeographySegmentData": {
          "yahooFinanceType": "number"
        },
        "repurchaseOfCapitalStock": {
          "yahooFinanceType": "number"
        },
        "repaymentOfDebt": {
          "yahooFinanceType": "number"
        },
        "issuanceOfDebt": {
          "yahooFinanceType": "number"
        },
        "issuanceOfCapitalStock": {
          "yahooFinanceType": "number"
        },
        "capitalExpenditure": {
          "yahooFinanceType": "number"
        },
        "interestPaidSupplementalData": {
          "yahooFinanceType": "number"
        },
        "incomeTaxPaidSupplementalData": {
          "yahooFinanceType": "number"
        },
        "endCashPosition": {
          "yahooFinanceType": "number"
        },
        "otherCashAdjustmentOutsideChangeinCash": {
          "yahooFinanceType": "number"
        },
        "beginningCashPosition": {
          "yahooFinanceType": "number"
        },
        "effectOfExchangeRateChanges": {
          "yahooFinanceType": "number"
        },
        "changesInCash": {
          "yahooFinanceType": "number"
        },
        "otherCashAdjustmentInsideChangeinCash": {
          "yahooFinanceType": "number"
        },
        "cashFlowFromDiscontinuedOperation": {
          "yahooFinanceType": "number"
        },
        "financingCashFlow": {
          "yahooFinanceType": "number"
        },
        "cashFromDiscontinuedFinancingActivities": {
          "yahooFinanceType": "number"
        },
        "cashFlowFromContinuingFinancingActivities": {
          "yahooFinanceType": "number"
        },
        "netOtherFinancingCharges": {
          "yahooFinanceType": "number"
        },
        "interestPaidCFF": {
          "yahooFinanceType": "number"
        },
        "proceedsFromStockOptionExercised": {
          "yahooFinanceType": "number"
        },
        "cashDividendsPaid": {
          "yahooFinanceType": "number"
        },
        "preferredStockDividendPaid": {
          "yahooFinanceType": "number"
        },
        "commonStockDividendPaid": {
          "yahooFinanceType": "number"
        },
        "netPreferredStockIssuance": {
          "yahooFinanceType": "number"
        },
        "preferredStockPayments": {
          "yahooFinanceType": "number"
        },
        "preferredStockIssuance": {
          "yahooFinanceType": "number"
        },
        "netCommonStockIssuance": {
          "yahooFinanceType": "number"
        },
        "commonStockPayments": {
          "yahooFinanceType": "number"
        },
        "commonStockIssuance": {
          "yahooFinanceType": "number"
        },
        "netIssuancePaymentsOfDebt": {
          "yahooFinanceType": "number"
        },
        "netShortTermDebtIssuance": {
          "yahooFinanceType": "number"
        },
        "shortTermDebtPayments": {
          "yahooFinanceType": "number"
        },
        "shortTermDebtIssuance": {
          "yahooFinanceType": "number"
        },
        "netLongTermDebtIssuance": {
          "yahooFinanceType": "number"
        },
        "longTermDebtPayments": {
          "yahooFinanceType": "number"
        },
        "longTermDebtIssuance": {
          "yahooFinanceType": "number"
        },
        "investingCashFlow": {
          "yahooFinanceType": "number"
        },
        "cashFromDiscontinuedInvestingActivities": {
          "yahooFinanceType": "number"
        },
        "cashFlowFromContinuingInvestingActivities": {
          "yahooFinanceType": "number"
        },
        "netOtherInvestingChanges": {
          "yahooFinanceType": "number"
        },
        "interestReceivedCFI": {
          "yahooFinanceType": "number"
        },
        "dividendsReceivedCFI": {
          "yahooFinanceType": "number"
        },
        "netInvestmentPurchaseAndSale": {
          "yahooFinanceType": "number"
        },
        "saleOfInvestment": {
          "yahooFinanceType": "number"
        },
        "purchaseOfInvestment": {
          "yahooFinanceType": "number"
        },
        "netInvestmentPropertiesPurchaseAndSale": {
          "yahooFinanceType": "number"
        },
        "saleOfInvestmentProperties": {
          "yahooFinanceType": "number"
        },
        "purchaseOfInvestmentProperties": {
          "yahooFinanceType": "number"
        },
        "netBusinessPurchaseAndSale": {
          "yahooFinanceType": "number"
        },
        "saleOfBusiness": {
          "yahooFinanceType": "number"
        },
        "purchaseOfBusiness": {
          "yahooFinanceType": "number"
        },
        "netIntangiblesPurchaseAndSale": {
          "yahooFinanceType": "number"
        },
        "saleOfIntangibles": {
          "yahooFinanceType": "number"
        },
        "purchaseOfIntangibles": {
          "yahooFinanceType": "number"
        },
        "netPPEPurchaseAndSale": {
          "yahooFinanceType": "number"
        },
        "saleOfPPE": {
          "yahooFinanceType": "number"
        },
        "purchaseOfPPE": {
          "yahooFinanceType": "number"
        },
        "capitalExpenditureReported": {
          "yahooFinanceType": "number"
        },
        "operatingCashFlow": {
          "yahooFinanceType": "number"
        },
        "cashFromDiscontinuedOperatingActivities": {
          "yahooFinanceType": "number"
        },
        "cashFlowFromContinuingOperatingActivities": {
          "yahooFinanceType": "number"
        },
        "taxesRefundPaid": {
          "yahooFinanceType": "number"
        },
        "interestReceivedCFO": {
          "yahooFinanceType": "number"
        },
        "interestPaidCFO": {
          "yahooFinanceType": "number"
        },
        "dividendReceivedCFO": {
          "yahooFinanceType": "number"
        },
        "dividendPaidCFO": {
          "yahooFinanceType": "number"
        },
        "changeInWorkingCapital": {
          "yahooFinanceType": "number"
        },
        "changeInOtherWorkingCapital": {
          "yahooFinanceType": "number"
        },
        "changeInOtherCurrentLiabilities": {
          "yahooFinanceType": "number"
        },
        "changeInOtherCurrentAssets": {
          "yahooFinanceType": "number"
        },
        "changeInPayablesAndAccruedExpense": {
          "yahooFinanceType": "number"
        },
        "changeInAccruedExpense": {
          "yahooFinanceType": "number"
        },
        "changeInInterestPayable": {
          "yahooFinanceType": "number"
        },
        "changeInPayable": {
          "yahooFinanceType": "number"
        },
        "changeInDividendPayable": {
          "yahooFinanceType": "number"
        },
        "changeInAccountPayable": {
          "yahooFinanceType": "number"
        },
        "changeInTaxPayable": {
          "yahooFinanceType": "number"
        },
        "changeInIncomeTaxPayable": {
          "yahooFinanceType": "number"
        },
        "changeInPrepaidAssets": {
          "yahooFinanceType": "number"
        },
        "changeInInventory": {
          "yahooFinanceType": "number"
        },
        "changeInReceivables": {
          "yahooFinanceType": "number"
        },
        "changesInAccountReceivables": {
          "yahooFinanceType": "number"
        },
        "otherNonCashItems": {
          "yahooFinanceType": "number"
        },
        "excessTaxBenefitFromStockBasedCompensation": {
          "yahooFinanceType": "number"
        },
        "stockBasedCompensation": {
          "yahooFinanceType": "number"
        },
        "unrealizedGainLossOnInvestmentSecurities": {
          "yahooFinanceType": "number"
        },
        "provisionandWriteOffofAssets": {
          "yahooFinanceType": "number"
        },
        "assetImpairmentCharge": {
          "yahooFinanceType": "number"
        },
        "amortizationOfSecurities": {
          "yahooFinanceType": "number"
        },
        "deferredTax": {
          "yahooFinanceType": "number"
        },
        "deferredIncomeTax": {
          "yahooFinanceType": "number"
        },
        "depletion": {
          "yahooFinanceType": "number"
        },
        "depreciationAndAmortization": {
          "yahooFinanceType": "number"
        },
        "amortizationCashFlow": {
          "yahooFinanceType": "number"
        },
        "amortizationOfIntangibles": {
          "yahooFinanceType": "number"
        },
        "depreciation": {
          "yahooFinanceType": "number"
        },
        "operatingGainsLosses": {
          "yahooFinanceType": "number"
        },
        "pensionAndEmployeeBenefitExpense": {
          "yahooFinanceType": "number"
        },
        "earningsLossesFromEquityInvestments": {
          "yahooFinanceType": "number"
        },
        "gainLossOnInvestmentSecurities": {
          "yahooFinanceType": "number"
        },
        "netForeignCurrencyExchangeGainLoss": {
          "yahooFinanceType": "number"
        },
        "gainLossOnSaleOfPPE": {
          "yahooFinanceType": "number"
        },
        "gainLossOnSaleOfBusiness": {
          "yahooFinanceType": "number"
        },
        "netIncomeFromContinuingOperations": {
          "yahooFinanceType": "number"
        },
        "cashFlowsfromusedinOperatingActivitiesDirect": {
          "yahooFinanceType": "number"
        },
        "taxesRefundPaidDirect": {
          "yahooFinanceType": "number"
        },
        "interestReceivedDirect": {
          "yahooFinanceType": "number"
        },
        "interestPaidDirect": {
          "yahooFinanceType": "number"
        },
        "dividendsReceivedDirect": {
          "yahooFinanceType": "number"
        },
        "dividendsPaidDirect": {
          "yahooFinanceType": "number"
        },
        "classesofCashPayments": {
          "yahooFinanceType": "number"
        },
        "otherCashPaymentsfromOperatingActivities": {
          "yahooFinanceType": "number"
        },
        "paymentsonBehalfofEmployees": {
          "yahooFinanceType": "number"
        },
        "paymentstoSuppliersforGoodsandServices": {
          "yahooFinanceType": "number"
        },
        "classesofCashReceiptsfromOperatingActivities": {
          "yahooFinanceType": "number"
        },
        "otherCashReceiptsfromOperatingActivities": {
          "yahooFinanceType": "number"
        },
        "receiptsfromGovernmentGrants": {
          "yahooFinanceType": "number"
        },
        "receiptsfromCustomers": {
          "yahooFinanceType": "number"
        },
        "increaseDecreaseInDeposit": {
          "yahooFinanceType": "number"
        },
        "changeInFederalFundsAndSecuritiesSoldForRepurchase": {
          "yahooFinanceType": "number"
        },
        "netProceedsPaymentForLoan": {
          "yahooFinanceType": "number"
        },
        "paymentForLoans": {
          "yahooFinanceType": "number"
        },
        "proceedsFromLoans": {
          "yahooFinanceType": "number"
        },
        "proceedsPaymentInInterestBearingDepositsInBank": {
          "yahooFinanceType": "number"
        },
        "increaseinInterestBearingDepositsinBank": {
          "yahooFinanceType": "number"
        },
        "decreaseinInterestBearingDepositsinBank": {
          "yahooFinanceType": "number"
        },
        "proceedsPaymentFederalFundsSoldAndSecuritiesPurchasedUnderAgreementToResell": {
          "yahooFinanceType": "number"
        },
        "changeInLoans": {
          "yahooFinanceType": "number"
        },
        "changeInDeferredCharges": {
          "yahooFinanceType": "number"
        },
        "provisionForLoanLeaseAndOtherLosses": {
          "yahooFinanceType": "number"
        },
        "amortizationOfFinancingCostsAndDiscounts": {
          "yahooFinanceType": "number"
        },
        "depreciationAmortizationDepletion": {
          "yahooFinanceType": "number"
        },
        "realizedGainLossOnSaleOfLoansAndLease": {
          "yahooFinanceType": "number"
        },
        "allTaxesPaid": {
          "yahooFinanceType": "number"
        },
        "interestandCommissionPaid": {
          "yahooFinanceType": "number"
        },
        "cashPaymentsforLoans": {
          "yahooFinanceType": "number"
        },
        "cashPaymentsforDepositsbyBanksandCustomers": {
          "yahooFinanceType": "number"
        },
        "cashReceiptsfromFeesandCommissions": {
          "yahooFinanceType": "number"
        },
        "cashReceiptsfromSecuritiesRelatedActivities": {
          "yahooFinanceType": "number"
        },
        "cashReceiptsfromLoans": {
          "yahooFinanceType": "number"
        },
        "cashReceiptsfromDepositsbyBanksandCustomers": {
          "yahooFinanceType": "number"
        },
        "cashReceiptsfromTaxRefunds": {
          "yahooFinanceType": "number"
        },
        "AmortizationAmortizationCashFlow": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "date",
        "TYPE",
        "periodType"
      ],
      "additionalProperties": false
    },
    "FundamentalsTimeSeriesResult": {
      "anyOf": [
        {
          "$ref": "#/definitions/FundamentalsTimeSeriesBalanceSheetResult"
        },
        {
          "$ref": "#/definitions/FundamentalsTimeSeriesCashFlowResult"
        },
        {
          "$ref": "#/definitions/FundamentalsTimeSeriesFinancialsResult"
        }
      ]
    },
    "FundamentalsTimeSeriesResults": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/FundamentalsTimeSeriesResult"
      }
    },
    "FundamentalsTimeSeriesOptions": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "yahooFinanceType": "number"
            },
            {
              "type": "string"
            }
          ]
        },
        "period2": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "yahooFinanceType": "number"
            },
            {
              "type": "string"
            }
          ]
        },
        "type": {
          "type": "string"
        },
        "merge": {
          "type": "boolean"
        },
        "padTimeSeries": {
          "type": "boolean"
        },
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "module": {
          "type": "string"
        }
      },
      "required": [
        "period1",
        "module"
      ],
      "additionalProperties": false
    },
    "NamedParameters<typeof fundamentalsTimeSeries>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "symbol": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/FundamentalsTimeSeriesOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this",
        "symbol",
        "queryOptionsOverrides"
      ],
      "additionalProperties": false
    },
    "NamedParameters<typeof processQuery>": {
      "type": "object",
      "properties": {
        "queryOptions": {
          "$ref": "#/definitions/FundamentalsTimeSeriesOptions",
          "description": "Input query options."
        }
      },
      "required": [
        "queryOptions"
      ],
      "additionalProperties": false
    },
    "NamedParameters<typeof processResponse>": {
      "type": "object",
      "properties": {
        "response": {
          "description": "Query response."
        }
      },
      "required": [
        "response"
      ],
      "additionalProperties": false
    },
    "HistoricalHistoryResult": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/HistoricalRowHistory"
      }
    },
    "HistoricalRowHistory": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "open": {
          "yahooFinanceType": "number"
        },
        "high": {
          "yahooFinanceType": "number"
        },
        "low": {
          "yahooFinanceType": "number"
        },
        "close": {
          "yahooFinanceType": "number"
        },
        "adjClose": {
          "yahooFinanceType": "number"
        },
        "volume": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "date",
        "open",
        "high",
        "low",
        "close",
        "volume"
      ],
      "additionalProperties": {}
    },
    "HistoricalDividendsResult": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/HistoricalRowDividend"
      }
    },
    "HistoricalRowDividend": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "dividends": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "date",
        "dividends"
      ],
      "additionalProperties": false
    },
    "HistoricalStockSplitsResult": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/HistoricalRowStockSplit"
      }
    },
    "HistoricalRowStockSplit": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "date"
        },
        "stockSplits": {
          "type": "string"
        }
      },
      "required": [
        "date",
        "stockSplits"
      ],
      "additionalProperties": false
    },
    "HistoricalResult": {
      "anyOf": [
        {
          "$ref": "#/definitions/HistoricalHistoryResult"
        },
        {
          "$ref": "#/definitions/HistoricalDividendsResult"
        },
        {
          "$ref": "#/definitions/HistoricalStockSplitsResult"
        }
      ]
    },
    "HistoricalOptions": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "period2": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "interval": {
          "type": "string",
          "enum": [
            "1d",
            "1wk",
            "1mo"
          ]
        },
        "events": {
          "type": "string",
          "enum": [
            "history",
            "dividends",
            "split"
          ]
        },
        "includeAdjustedClose": {
          "type": "boolean"
        }
      },
      "required": [
        "period1"
      ],
      "additionalProperties": false
    },
    "HistoricalOptionsEventsHistory": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "period2": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "interval": {
          "type": "string",
          "enum": [
            "1d",
            "1wk",
            "1mo"
          ]
        },
        "events": {
          "type": "string",
          "const": "history"
        },
        "includeAdjustedClose": {
          "type": "boolean"
        }
      },
      "additionalProperties": false,
      "required": [
        "period1"
      ]
    },
    "HistoricalOptionsEventsDividends": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "period2": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "interval": {
          "type": "string",
          "enum": [
            "1d",
            "1wk",
            "1mo"
          ]
        },
        "events": {
          "type": "string",
          "const": "dividends"
        },
        "includeAdjustedClose": {
          "type": "boolean"
        }
      },
      "required": [
        "events",
        "period1"
      ],
      "additionalProperties": false
    },
    "HistoricalOptionsEventsSplit": {
      "type": "object",
      "properties": {
        "period1": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "period2": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "type": "string"
            },
            {
              "yahooFinanceType": "number"
            }
          ]
        },
        "interval": {
          "type": "string",
          "enum": [
            "1d",
            "1wk",
            "1mo"
          ]
        },
        "events": {
          "type": "string",
          "const": "split"
        },
        "includeAdjustedClose": {
          "type": "boolean"
        }
      },
      "required": [
        "events",
        "period1"
      ],
      "additionalProperties": false
    },
    "NamedParameters<typeof nullFieldCount>": {
      "type": "object",
      "properties": {
        "object": {}
      },
      "required": [
        "object"
      ],
      "additionalProperties": false
    },
    "NamedParameters<typeof historical>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "symbol": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/HistoricalOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this",
        "symbol",
        "queryOptionsOverrides"
      ],
      "additionalProperties": false
    },
    "InsightsResult": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "instrumentInfo": {
          "$ref": "#/definitions/InsightsInstrumentInfo"
        },
        "companySnapshot": {
          "$ref": "#/definitions/InsightsCompanySnapshot"
        },
        "recommendation": {
          "type": "object",
          "properties": {
            "targetPrice": {
              "yahooFinanceType": "number"
            },
            "provider": {
              "type": "string"
            },
            "rating": {
              "type": "string",
              "enum": [
                "BUY",
                "SELL",
                "HOLD"
              ]
            }
          },
          "required": [
            "provider",
            "rating"
          ],
          "additionalProperties": false
        },
        "events": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InsightsEvent"
          }
        },
        "reports": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InsightsReport"
          }
        },
        "sigDevs": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InsightsSigDev"
          }
        },
        "upsell": {
          "$ref": "#/definitions/InsightsUpsell"
        },
        "upsellSearchDD": {
          "type": "object",
          "properties": {
            "researchReports": {
              "$ref": "#/definitions/InsightsResearchReport"
            }
          },
          "required": [
            "researchReports"
          ],
          "additionalProperties": false
        },
        "secReports": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/InsightsSecReport"
          }
        }
      },
      "required": [
        "symbol",
        "sigDevs"
      ],
      "additionalProperties": {}
    },
    "InsightsInstrumentInfo": {
      "type": "object",
      "properties": {
        "keyTechnicals": {
          "type": "object",
          "properties": {
            "provider": {
              "type": "string"
            },
            "support": {
              "yahooFinanceType": "number"
            },
            "resistance": {
              "yahooFinanceType": "number"
            },
            "stopLoss": {
              "yahooFinanceType": "number"
            }
          },
          "required": [
            "provider"
          ],
          "additionalProperties": {}
        },
        "technicalEvents": {
          "type": "object",
          "properties": {
            "provider": {
              "type": "string"
            },
            "sector": {
              "type": "string"
            },
            "shortTermOutlook": {
              "$ref": "#/definitions/InsightsOutlook"
            },
            "intermediateTermOutlook": {
              "$ref": "#/definitions/InsightsOutlook"
            },
            "longTermOutlook": {
              "$ref": "#/definitions/InsightsOutlook"
            }
          },
          "required": [
            "provider",
            "shortTermOutlook",
            "intermediateTermOutlook",
            "longTermOutlook"
          ],
          "additionalProperties": {}
        },
        "valuation": {
          "type": "object",
          "properties": {
            "color": {
              "yahooFinanceType": "number"
            },
            "description": {
              "type": "string"
            },
            "discount": {
              "type": "string"
            },
            "provider": {
              "type": "string"
            },
            "relativeValue": {
              "type": "string"
            }
          },
          "required": [
            "provider"
          ],
          "additionalProperties": {}
        }
      },
      "required": [
        "keyTechnicals",
        "technicalEvents",
        "valuation"
      ],
      "additionalProperties": {}
    },
    "InsightsOutlook": {
      "type": "object",
      "properties": {
        "stateDescription": {
          "type": "string"
        },
        "direction": {
          "$ref": "#/definitions/InsightsDirection"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "scoreDescription": {
          "type": "string"
        },
        "sectorDirection": {
          "$ref": "#/definitions/InsightsDirection"
        },
        "sectorScore": {
          "yahooFinanceType": "number"
        },
        "sectorScoreDescription": {
          "type": "string"
        },
        "indexDirection": {
          "$ref": "#/definitions/InsightsDirection"
        },
        "indexScore": {
          "yahooFinanceType": "number"
        },
        "indexScoreDescription": {
          "type": "string"
        }
      },
      "required": [
        "stateDescription",
        "direction",
        "score",
        "scoreDescription",
        "indexDirection",
        "indexScore",
        "indexScoreDescription"
      ],
      "additionalProperties": {}
    },
    "InsightsDirection": {
      "type": "string",
      "enum": [
        "Bearish",
        "Bullish",
        "Neutral"
      ]
    },
    "InsightsCompanySnapshot": {
      "type": "object",
      "properties": {
        "sectorInfo": {
          "type": "string"
        },
        "company": {
          "type": "object",
          "properties": {
            "innovativeness": {
              "yahooFinanceType": "number"
            },
            "hiring": {
              "yahooFinanceType": "number"
            },
            "sustainability": {
              "yahooFinanceType": "number"
            },
            "insiderSentiments": {
              "yahooFinanceType": "number"
            },
            "earningsReports": {
              "yahooFinanceType": "number"
            },
            "dividends": {
              "yahooFinanceType": "number"
            }
          },
          "additionalProperties": {}
        },
        "sector": {
          "type": "object",
          "properties": {
            "innovativeness": {
              "yahooFinanceType": "number"
            },
            "hiring": {
              "yahooFinanceType": "number"
            },
            "sustainability": {
              "yahooFinanceType": "number"
            },
            "insiderSentiments": {
              "yahooFinanceType": "number"
            },
            "earningsReports": {
              "yahooFinanceType": "number"
            },
            "dividends": {
              "yahooFinanceType": "number"
            }
          },
          "required": [
            "innovativeness",
            "hiring",
            "insiderSentiments",
            "dividends"
          ],
          "additionalProperties": {}
        }
      },
      "required": [
        "company",
        "sector"
      ],
      "additionalProperties": {}
    },
    "InsightsEvent": {
      "type": "object",
      "properties": {
        "eventType": {
          "type": "string"
        },
        "pricePeriod": {
          "type": "string"
        },
        "tradingHorizon": {
          "type": "string"
        },
        "tradeType": {
          "type": "string"
        },
        "imageUrl": {
          "type": "string"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "endDate": {
          "yahooFinanceType": "date"
        }
      },
      "required": [
        "eventType",
        "pricePeriod",
        "tradingHorizon",
        "tradeType",
        "imageUrl",
        "startDate",
        "endDate"
      ],
      "additionalProperties": {}
    },
    "InsightsReport": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "headHtml": {
          "type": "string"
        },
        "provider": {
          "type": "string"
        },
        "reportDate": {
          "yahooFinanceType": "date"
        },
        "reportTitle": {
          "type": "string"
        },
        "reportType": {
          "type": "string"
        },
        "targetPrice": {
          "yahooFinanceType": "number"
        },
        "targetPriceStatus": {
          "type": "string",
          "enum": [
            "Increased",
            "Maintained",
            "Decreased",
            "-"
          ]
        },
        "investmentRating": {
          "type": "string",
          "enum": [
            "Bullish",
            "Neutral",
            "Bearish"
          ]
        },
        "tickers": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "id",
        "headHtml",
        "provider",
        "reportDate",
        "reportTitle",
        "reportType"
      ],
      "additionalProperties": {}
    },
    "InsightsSigDev": {
      "type": "object",
      "properties": {
        "headline": {
          "type": "string"
        },
        "date": {
          "yahooFinanceType": "date"
        }
      },
      "required": [
        "headline",
        "date"
      ],
      "additionalProperties": {}
    },
    "InsightsUpsell": {
      "type": "object",
      "properties": {
        "msBullishSummary": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "msBearishSummary": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "msBullishBearishSummariesPublishDate": {
          "yahooFinanceType": "DateInMs"
        },
        "companyName": {
          "type": "string"
        },
        "upsellReportType": {
          "type": "string"
        }
      },
      "additionalProperties": {}
    },
    "DateInMs": {
      "yahooFinanceType": "date"
    },
    "InsightsResearchReport": {
      "type": "object",
      "properties": {
        "reportId": {
          "type": "string"
        },
        "provider": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "reportDate": {
          "yahooFinanceType": "date"
        },
        "summary": {
          "type": "string"
        },
        "investmentRating": {
          "type": "string",
          "enum": [
            "Bullish",
            "Neutral",
            "Bearish"
          ]
        }
      },
      "required": [
        "reportId",
        "provider",
        "title",
        "reportDate",
        "summary"
      ],
      "additionalProperties": false
    },
    "InsightsSecReport": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "filingDate": {
          "yahooFinanceType": "DateInMs"
        },
        "snapshotUrl": {
          "type": "string"
        },
        "formType": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "type",
        "title",
        "description",
        "filingDate",
        "snapshotUrl",
        "formType"
      ],
      "additionalProperties": false
    },
    "InsightsOptions": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "reportsCount": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof trendingSymbols>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "query": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/TrendingSymbolsOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this",
        "query"
      ],
      "additionalProperties": false
    },
    "TrendingSymbolsOptions": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "count": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": false
    },
    "QuoteBase": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": [
            "REGULAR",
            "CLOSED",
            "PRE",
            "PREPRE",
            "POST",
            "POSTPOST"
          ]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "corporateActions": {
          "type": "array",
          "items": {}
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "language",
        "region",
        "quoteType",
        "triggerable",
        "marketState",
        "tradeable",
        "exchange",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "gmtOffSetMilliseconds",
        "market",
        "esgPopulated",
        "sourceInterval",
        "exchangeDataDelayedBy",
        "priceHint",
        "fullExchangeName",
        "symbol"
      ]
    },
    "TwoNumberRange": {
      "type": "object",
      "properties": {
        "low": {
          "yahooFinanceType": "number"
        },
        "high": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "low",
        "high"
      ],
      "additionalProperties": false
    },
    "QuoteCryptoCurrency": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "CRYPTOCURRENCY"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": [
            "REGULAR",
            "CLOSED",
            "PRE",
            "PREPRE",
            "POST",
            "POSTPOST"
          ]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "corporateActions": {
          "type": "array",
          "items": {}
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "circulatingSupply": {
          "yahooFinanceType": "number"
        },
        "fromCurrency": {
          "type": "string"
        },
        "toCurrency": {
          "type": "string"
        },
        "lastMarket": {
          "type": "string"
        },
        "coinImageUrl": {
          "type": "string"
        },
        "volume24Hr": {
          "yahooFinanceType": "number"
        },
        "volumeAllCurrencies": {
          "yahooFinanceType": "number"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "coinMarketCapLink": {
          "type": "string"
        },
        "logoUrl": {
          "type": "string"
        }
      },
      "required": [
        "circulatingSupply",
        "esgPopulated",
        "exchange",
        "exchangeDataDelayedBy",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "fromCurrency",
        "fullExchangeName",
        "gmtOffSetMilliseconds",
        "language",
        "lastMarket",
        "market",
        "marketState",
        "priceHint",
        "quoteType",
        "region",
        "sourceInterval",
        "symbol",
        "toCurrency",
        "tradeable",
        "triggerable"
      ]
    },
    "QuoteCurrency": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "CURRENCY"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": [
            "REGULAR",
            "CLOSED",
            "PRE",
            "PREPRE",
            "POST",
            "POSTPOST"
          ]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "corporateActions": {
          "type": "array",
          "items": {}
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "esgPopulated",
        "exchange",
        "exchangeDataDelayedBy",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "fullExchangeName",
        "gmtOffSetMilliseconds",
        "language",
        "market",
        "marketState",
        "priceHint",
        "quoteType",
        "region",
        "sourceInterval",
        "symbol",
        "tradeable",
        "triggerable"
      ]
    },
    "QuoteEtf": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "ETF"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": [
            "REGULAR",
            "CLOSED",
            "PRE",
            "PREPRE",
            "POST",
            "POSTPOST"
          ]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "corporateActions": {
          "type": "array",
          "items": {}
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "dividendYield": {
          "yahooFinanceType": "number"
        },
        "netAssets": {
          "yahooFinanceType": "number"
        },
        "netExpenseRatio": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "dividendYield",
        "esgPopulated",
        "exchange",
        "exchangeDataDelayedBy",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "fullExchangeName",
        "gmtOffSetMilliseconds",
        "language",
        "market",
        "marketState",
        "netAssets",
        "netExpenseRatio",
        "priceHint",
        "quoteType",
        "region",
        "sourceInterval",
        "symbol",
        "tradeable",
        "triggerable"
      ]
    },
    "QuoteEquity": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "EQUITY"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": [
            "REGULAR",
            "CLOSED",
            "PRE",
            "PREPRE",
            "POST",
            "POSTPOST"
          ]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "corporateActions": {
          "type": "array",
          "items": {}
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "dividendRate": {
          "yahooFinanceType": "number"
        },
        "dividendYield": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "esgPopulated",
        "exchange",
        "exchangeDataDelayedBy",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "fullExchangeName",
        "gmtOffSetMilliseconds",
        "language",
        "market",
        "marketState",
        "priceHint",
        "quoteType",
        "region",
        "sourceInterval",
        "symbol",
        "tradeable",
        "triggerable"
      ]
    },
    "QuoteFuture": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "FUTURE"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": [
            "REGULAR",
            "CLOSED",
            "PRE",
            "PREPRE",
            "POST",
            "POSTPOST"
          ]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "corporateActions": {
          "type": "array",
          "items": {}
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "headSymbolAsString": {
          "type": "string"
        },
        "contractSymbol": {
          "type": "boolean"
        },
        "underlyingExchangeSymbol": {
          "type": "string"
        },
        "expireDate": {
          "yahooFinanceType": "date"
        },
        "expireIsoDate": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "contractSymbol",
        "esgPopulated",
        "exchange",
        "exchangeDataDelayedBy",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "expireDate",
        "expireIsoDate",
        "fullExchangeName",
        "gmtOffSetMilliseconds",
        "headSymbolAsString",
        "language",
        "market",
        "marketState",
        "priceHint",
        "quoteType",
        "region",
        "sourceInterval",
        "symbol",
        "tradeable",
        "triggerable",
        "underlyingExchangeSymbol"
      ]
    },
    "QuoteIndex": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "INDEX"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": [
            "REGULAR",
            "CLOSED",
            "PRE",
            "PREPRE",
            "POST",
            "POSTPOST"
          ]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "corporateActions": {
          "type": "array",
          "items": {}
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "esgPopulated",
        "exchange",
        "exchangeDataDelayedBy",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "fullExchangeName",
        "gmtOffSetMilliseconds",
        "language",
        "market",
        "marketState",
        "priceHint",
        "quoteType",
        "region",
        "sourceInterval",
        "symbol",
        "tradeable",
        "triggerable"
      ]
    },
    "QuoteOption": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "OPTION"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": [
            "REGULAR",
            "CLOSED",
            "PRE",
            "PREPRE",
            "POST",
            "POSTPOST"
          ]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "corporateActions": {
          "type": "array",
          "items": {}
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "strike": {
          "yahooFinanceType": "number"
        },
        "expireDate": {
          "yahooFinanceType": "number"
        },
        "expireIsoDate": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "esgPopulated",
        "exchange",
        "exchangeDataDelayedBy",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "expireDate",
        "expireIsoDate",
        "fullExchangeName",
        "gmtOffSetMilliseconds",
        "language",
        "market",
        "marketState",
        "openInterest",
        "priceHint",
        "quoteType",
        "region",
        "sourceInterval",
        "strike",
        "symbol",
        "tradeable",
        "triggerable",
        "underlyingSymbol"
      ]
    },
    "QuoteMutualfund": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string",
          "const": "MUTUALFUND"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "currency": {
          "type": "string"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "marketState": {
          "type": "string",
          "enum": [
            "REGULAR",
            "CLOSED",
            "PRE",
            "PREPRE",
            "POST",
            "POSTPOST"
          ]
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "corporateActions": {
          "type": "array",
          "items": {}
        },
        "exchange": {
          "type": "string"
        },
        "shortName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "DateInMs"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "yahooFinanceType": "TwoNumberRange"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthNavReturns": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "date"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "pageViewGrowthWeekly": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "esgPopulated",
        "exchange",
        "exchangeDataDelayedBy",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "fullExchangeName",
        "gmtOffSetMilliseconds",
        "language",
        "market",
        "marketState",
        "priceHint",
        "quoteType",
        "region",
        "sourceInterval",
        "symbol",
        "tradeable",
        "triggerable"
      ]
    },
    "Quote": {
      "anyOf": [
        {
          "$ref": "#/definitions/QuoteCryptoCurrency"
        },
        {
          "$ref": "#/definitions/QuoteCurrency"
        },
        {
          "$ref": "#/definitions/QuoteEtf"
        },
        {
          "$ref": "#/definitions/QuoteEquity"
        },
        {
          "$ref": "#/definitions/QuoteFuture"
        },
        {
          "$ref": "#/definitions/QuoteIndex"
        },
        {
          "$ref": "#/definitions/QuoteMutualfund"
        },
        {
          "$ref": "#/definitions/QuoteOption"
        }
      ]
    },
    "QuoteField": {
      "type": "string",
      "enum": [
        "quoteType",
        "circulatingSupply",
        "fromCurrency",
        "toCurrency",
        "lastMarket",
        "coinImageUrl",
        "volume24Hr",
        "volumeAllCurrencies",
        "startDate",
        "coinMarketCapLink",
        "logoUrl",
        "language",
        "region",
        "typeDisp",
        "quoteSourceName",
        "triggerable",
        "currency",
        "customPriceAlertConfidence",
        "marketState",
        "tradeable",
        "cryptoTradeable",
        "corporateActions",
        "exchange",
        "shortName",
        "longName",
        "messageBoardId",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "gmtOffSetMilliseconds",
        "market",
        "esgPopulated",
        "fiftyTwoWeekLowChange",
        "fiftyTwoWeekLowChangePercent",
        "fiftyTwoWeekRange",
        "fiftyTwoWeekHighChange",
        "fiftyTwoWeekHighChangePercent",
        "fiftyTwoWeekLow",
        "fiftyTwoWeekHigh",
        "fiftyTwoWeekChangePercent",
        "dividendDate",
        "earningsTimestamp",
        "earningsTimestampStart",
        "earningsTimestampEnd",
        "earningsCallTimestampStart",
        "earningsCallTimestampEnd",
        "isEarningsDateEstimate",
        "trailingAnnualDividendRate",
        "trailingPE",
        "trailingAnnualDividendYield",
        "epsTrailingTwelveMonths",
        "epsForward",
        "epsCurrentYear",
        "priceEpsCurrentYear",
        "sharesOutstanding",
        "bookValue",
        "fiftyDayAverage",
        "fiftyDayAverageChange",
        "fiftyDayAverageChangePercent",
        "twoHundredDayAverage",
        "twoHundredDayAverageChange",
        "twoHundredDayAverageChangePercent",
        "marketCap",
        "forwardPE",
        "priceToBook",
        "sourceInterval",
        "exchangeDataDelayedBy",
        "firstTradeDateMilliseconds",
        "priceHint",
        "postMarketChangePercent",
        "postMarketTime",
        "postMarketPrice",
        "postMarketChange",
        "hasPrePostMarketData",
        "regularMarketChange",
        "regularMarketChangePercent",
        "regularMarketTime",
        "regularMarketPrice",
        "regularMarketDayHigh",
        "regularMarketDayRange",
        "regularMarketDayLow",
        "regularMarketVolume",
        "regularMarketPreviousClose",
        "preMarketChange",
        "preMarketChangePercent",
        "preMarketTime",
        "preMarketPrice",
        "bid",
        "ask",
        "bidSize",
        "askSize",
        "fullExchangeName",
        "financialCurrency",
        "regularMarketOpen",
        "averageDailyVolume3Month",
        "averageDailyVolume10Day",
        "displayName",
        "symbol",
        "underlyingSymbol",
        "ytdReturn",
        "trailingThreeMonthReturns",
        "trailingThreeMonthNavReturns",
        "ipoExpectedDate",
        "newListingDate",
        "nameChangeDate",
        "prevName",
        "averageAnalystRating",
        "pageViewGrowthWeekly",
        "openInterest",
        "beta",
        "dividendYield",
        "netAssets",
        "netExpenseRatio",
        "dividendRate",
        "headSymbolAsString",
        "contractSymbol",
        "underlyingExchangeSymbol",
        "expireDate",
        "expireIsoDate",
        "strike"
      ]
    },
    "ResultType": {
      "type": "string",
      "enum": [
        "array",
        "object",
        "map"
      ]
    },
    "QuoteResponseArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Quote"
      }
    },
    "QuoteResponseMap": {
      "type": "object",
      "properties": {
        "size": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "size"
      ],
      "additionalProperties": false
    },
    "QuoteResponseObject": {
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/Quote"
      }
    },
    "QuoteOptions": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/QuoteField"
          }
        },
        "return": {
          "$ref": "#/definitions/ResultType"
        }
      },
      "additionalProperties": false
    },
    "QuoteOptionsWithReturnArray": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/QuoteField"
          }
        },
        "return": {
          "type": "string",
          "const": "array"
        }
      },
      "additionalProperties": false
    },
    "QuoteOptionsWithReturnMap": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/QuoteField"
          }
        },
        "return": {
          "type": "string",
          "const": "map"
        }
      },
      "required": [
        "return"
      ],
      "additionalProperties": false
    },
    "QuoteOptionsWithReturnObject": {
      "type": "object",
      "properties": {
        "fields": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/QuoteField"
          }
        },
        "return": {
          "type": "string",
          "const": "object"
        }
      },
      "required": [
        "return"
      ],
      "additionalProperties": false
    },
    "NamedParameters<typeof quote>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "query": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          ]
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/QuoteOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this",
        "query"
      ],
      "additionalProperties": false
    },
    "OptionsResult": {
      "type": "object",
      "properties": {
        "underlyingSymbol": {
          "type": "string"
        },
        "expirationDates": {
          "type": "array",
          "items": {
            "yahooFinanceType": "date"
          }
        },
        "strikes": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "hasMiniOptions": {
          "type": "boolean"
        },
        "quote": {
          "$ref": "#/definitions/Quote"
        },
        "options": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Option"
          }
        }
      },
      "required": [
        "underlyingSymbol",
        "expirationDates",
        "strikes",
        "hasMiniOptions",
        "quote",
        "options"
      ],
      "additionalProperties": {}
    },
    "Option": {
      "type": "object",
      "properties": {
        "expirationDate": {
          "yahooFinanceType": "date"
        },
        "hasMiniOptions": {
          "type": "boolean"
        },
        "calls": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/CallOrPut"
          }
        },
        "puts": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/CallOrPut"
          }
        }
      },
      "required": [
        "expirationDate",
        "hasMiniOptions",
        "calls",
        "puts"
      ],
      "additionalProperties": {}
    },
    "CallOrPut": {
      "type": "object",
      "properties": {
        "contractSymbol": {
          "type": "string"
        },
        "strike": {
          "yahooFinanceType": "number"
        },
        "currency": {
          "type": "string"
        },
        "lastPrice": {
          "yahooFinanceType": "number"
        },
        "change": {
          "yahooFinanceType": "number"
        },
        "percentChange": {
          "yahooFinanceType": "number"
        },
        "volume": {
          "yahooFinanceType": "number"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "contractSize": {
          "type": "string",
          "const": "REGULAR"
        },
        "expiration": {
          "yahooFinanceType": "date"
        },
        "lastTradeDate": {
          "yahooFinanceType": "date"
        },
        "impliedVolatility": {
          "yahooFinanceType": "number"
        },
        "inTheMoney": {
          "type": "boolean"
        }
      },
      "required": [
        "contractSymbol",
        "strike",
        "lastPrice",
        "change",
        "contractSize",
        "expiration",
        "lastTradeDate",
        "impliedVolatility",
        "inTheMoney"
      ],
      "additionalProperties": {}
    },
    "OptionsOptions": {
      "type": "object",
      "properties": {
        "formatted": {
          "type": "boolean"
        },
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "date": {
          "anyOf": [
            {
              "yahooFinanceType": "date"
            },
            {
              "yahooFinanceType": "number"
            },
            {
              "type": "string"
            }
          ]
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof options>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "symbol": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/OptionsOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this",
        "symbol"
      ],
      "additionalProperties": false
    },
    "QuoteSummaryResult": {
      "type": "object",
      "properties": {
        "assetProfile": {
          "$ref": "#/definitions/AssetProfile"
        },
        "balanceSheetHistory": {
          "$ref": "#/definitions/BalanceSheetHistory"
        },
        "balanceSheetHistoryQuarterly": {
          "$ref": "#/definitions/BalanceSheetHistory"
        },
        "calendarEvents": {
          "$ref": "#/definitions/CalendarEvents"
        },
        "cashflowStatementHistory": {
          "$ref": "#/definitions/CashflowStatementHistory"
        },
        "cashflowStatementHistoryQuarterly": {
          "$ref": "#/definitions/CashflowStatementHistory"
        },
        "defaultKeyStatistics": {
          "$ref": "#/definitions/DefaultKeyStatistics"
        },
        "earnings": {
          "$ref": "#/definitions/QuoteSummaryEarnings"
        },
        "earningsHistory": {
          "$ref": "#/definitions/EarningsHistory"
        },
        "earningsTrend": {
          "$ref": "#/definitions/EarningsTrend"
        },
        "financialData": {
          "$ref": "#/definitions/FinancialData"
        },
        "fundOwnership": {
          "$ref": "#/definitions/Ownership"
        },
        "fundPerformance": {
          "$ref": "#/definitions/FundPerformance"
        },
        "fundProfile": {
          "$ref": "#/definitions/FundProfile"
        },
        "incomeStatementHistory": {
          "$ref": "#/definitions/IncomeStatementHistory"
        },
        "incomeStatementHistoryQuarterly": {
          "$ref": "#/definitions/IncomeStatementHistory"
        },
        "indexTrend": {
          "$ref": "#/definitions/IndexTrend"
        },
        "industryTrend": {
          "$ref": "#/definitions/Trend"
        },
        "insiderHolders": {
          "$ref": "#/definitions/Holders"
        },
        "insiderTransactions": {
          "$ref": "#/definitions/InsiderTransactions"
        },
        "institutionOwnership": {
          "$ref": "#/definitions/Ownership"
        },
        "majorDirectHolders": {
          "$ref": "#/definitions/Holders"
        },
        "majorHoldersBreakdown": {
          "$ref": "#/definitions/MajorHoldersBreakdown"
        },
        "netSharePurchaseActivity": {
          "$ref": "#/definitions/NetSharePurchaseActivity"
        },
        "price": {
          "$ref": "#/definitions/Price"
        },
        "quoteType": {
          "$ref": "#/definitions/QuoteType"
        },
        "recommendationTrend": {
          "$ref": "#/definitions/RecommendationTrend"
        },
        "secFilings": {
          "$ref": "#/definitions/SECFilings"
        },
        "sectorTrend": {
          "$ref": "#/definitions/Trend"
        },
        "summaryDetail": {
          "$ref": "#/definitions/SummaryDetail"
        },
        "summaryProfile": {
          "$ref": "#/definitions/SummaryProfile"
        },
        "topHoldings": {
          "$ref": "#/definitions/TopHoldings"
        },
        "upgradeDowngradeHistory": {
          "$ref": "#/definitions/UpgradeDowngradeHistory"
        }
      },
      "additionalProperties": {}
    },
    "AssetProfile": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "address3": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "fax": {
          "type": "string"
        },
        "website": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "industryDisp": {
          "type": "string"
        },
        "industryKey": {
          "type": "string"
        },
        "industrySymbol": {
          "type": "string"
        },
        "sector": {
          "type": "string"
        },
        "sectorDisp": {
          "type": "string"
        },
        "sectorKey": {
          "type": "string"
        },
        "longBusinessSummary": {
          "type": "string"
        },
        "fullTimeEmployees": {
          "yahooFinanceType": "number"
        },
        "companyOfficers": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/CompanyOfficer"
          }
        },
        "auditRisk": {
          "yahooFinanceType": "number"
        },
        "boardRisk": {
          "yahooFinanceType": "number"
        },
        "compensationRisk": {
          "yahooFinanceType": "number"
        },
        "shareHolderRightsRisk": {
          "yahooFinanceType": "number"
        },
        "overallRisk": {
          "yahooFinanceType": "number"
        },
        "governanceEpochDate": {
          "yahooFinanceType": "date"
        },
        "compensationAsOfEpochDate": {
          "yahooFinanceType": "date"
        },
        "name": {
          "type": "string"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "description": {
          "type": "string"
        },
        "twitter": {
          "type": "string"
        },
        "irWebsite": {
          "type": "string"
        },
        "executiveTeam": {
          "type": "array",
          "items": {}
        }
      },
      "required": [
        "maxAge",
        "companyOfficers"
      ],
      "additionalProperties": {}
    },
    "CompanyOfficer": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "name": {
          "type": "string"
        },
        "age": {
          "yahooFinanceType": "number"
        },
        "title": {
          "type": "string"
        },
        "yearBorn": {
          "yahooFinanceType": "number"
        },
        "fiscalYear": {
          "yahooFinanceType": "number"
        },
        "totalPay": {
          "yahooFinanceType": "number"
        },
        "exercisedValue": {
          "yahooFinanceType": "number"
        },
        "unexercisedValue": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge",
        "name",
        "title"
      ],
      "additionalProperties": {}
    },
    "BalanceSheetHistory": {
      "type": "object",
      "properties": {
        "balanceSheetStatements": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/BalanceSheetStatement"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "balanceSheetStatements",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "BalanceSheetStatement": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "endDate": {
          "yahooFinanceType": "date"
        },
        "cash": {
          "yahooFinanceType": "number"
        },
        "shortTermInvestments": {
          "yahooFinanceType": "number"
        },
        "netReceivables": {
          "yahooFinanceType": "number"
        },
        "inventory": {
          "yahooFinanceType": "number"
        },
        "otherCurrentAssets": {
          "yahooFinanceType": "number"
        },
        "totalCurrentAssets": {
          "yahooFinanceType": "number"
        },
        "longTermInvestments": {
          "yahooFinanceType": "number"
        },
        "propertyPlantEquipment": {
          "yahooFinanceType": "number"
        },
        "otherAssets": {
          "yahooFinanceType": "number"
        },
        "totalAssets": {
          "yahooFinanceType": "number"
        },
        "accountsPayable": {
          "yahooFinanceType": "number"
        },
        "shortLongTermDebt": {
          "yahooFinanceType": "number"
        },
        "otherCurrentLiab": {
          "yahooFinanceType": "number"
        },
        "longTermDebt": {
          "yahooFinanceType": "number"
        },
        "otherLiab": {
          "yahooFinanceType": "number"
        },
        "totalCurrentLiabilities": {
          "yahooFinanceType": "number"
        },
        "totalLiab": {
          "yahooFinanceType": "number"
        },
        "commonStock": {
          "yahooFinanceType": "number"
        },
        "retainedEarnings": {
          "yahooFinanceType": "number"
        },
        "treasuryStock": {
          "yahooFinanceType": "number"
        },
        "otherStockholderEquity": {
          "yahooFinanceType": "number"
        },
        "totalStockholderEquity": {
          "yahooFinanceType": "number"
        },
        "netTangibleAssets": {
          "yahooFinanceType": "number"
        },
        "goodWill": {
          "yahooFinanceType": "number"
        },
        "intangibleAssets": {
          "yahooFinanceType": "number"
        },
        "deferredLongTermAssetCharges": {
          "yahooFinanceType": "number"
        },
        "deferredLongTermLiab": {
          "yahooFinanceType": "number"
        },
        "minorityInterest": {
          "yahooFinanceType": "number|null"
        },
        "capitalSurplus": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge",
        "endDate"
      ],
      "additionalProperties": {}
    },
    "CalendarEvents": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "earnings": {
          "$ref": "#/definitions/CalendarEventsEarnings"
        },
        "exDividendDate": {
          "yahooFinanceType": "date"
        },
        "dividendDate": {
          "yahooFinanceType": "date"
        }
      },
      "required": [
        "maxAge",
        "earnings"
      ],
      "additionalProperties": {}
    },
    "CalendarEventsEarnings": {
      "type": "object",
      "properties": {
        "earningsCallDate": {
          "type": "array",
          "items": {
            "yahooFinanceType": "date"
          }
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "earningsDate": {
          "type": "array",
          "items": {
            "yahooFinanceType": "date"
          }
        },
        "earningsAverage": {
          "yahooFinanceType": "number"
        },
        "earningsLow": {
          "yahooFinanceType": "number"
        },
        "earningsHigh": {
          "yahooFinanceType": "number"
        },
        "revenueAverage": {
          "yahooFinanceType": "number"
        },
        "revenueLow": {
          "yahooFinanceType": "number"
        },
        "revenueHigh": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "earningsCallDate",
        "earningsDate"
      ],
      "additionalProperties": {}
    },
    "CashflowStatementHistory": {
      "type": "object",
      "properties": {
        "cashflowStatements": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/CashflowStatement"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "cashflowStatements",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "CashflowStatement": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "endDate": {
          "yahooFinanceType": "date"
        },
        "netIncome": {
          "yahooFinanceType": "number"
        },
        "depreciation": {
          "yahooFinanceType": "number"
        },
        "changeToNetincome": {
          "yahooFinanceType": "number"
        },
        "changeToAccountReceivables": {
          "yahooFinanceType": "number"
        },
        "changeToLiabilities": {
          "yahooFinanceType": "number"
        },
        "changeToInventory": {
          "yahooFinanceType": "number"
        },
        "changeToOperatingActivities": {
          "yahooFinanceType": "number"
        },
        "totalCashFromOperatingActivities": {
          "yahooFinanceType": "number"
        },
        "capitalExpenditures": {
          "yahooFinanceType": "number"
        },
        "investments": {
          "yahooFinanceType": "number"
        },
        "otherCashflowsFromInvestingActivities": {
          "yahooFinanceType": "number"
        },
        "totalCashflowsFromInvestingActivities": {
          "yahooFinanceType": "number"
        },
        "dividendsPaid": {
          "yahooFinanceType": "number"
        },
        "netBorrowings": {
          "yahooFinanceType": "number"
        },
        "otherCashflowsFromFinancingActivities": {
          "yahooFinanceType": "number"
        },
        "totalCashFromFinancingActivities": {
          "yahooFinanceType": "number"
        },
        "changeInCash": {
          "yahooFinanceType": "number"
        },
        "repurchaseOfStock": {
          "yahooFinanceType": "number"
        },
        "issuanceOfStock": {
          "yahooFinanceType": "number"
        },
        "effectOfExchangeRate": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge",
        "endDate",
        "netIncome"
      ],
      "additionalProperties": {}
    },
    "DefaultKeyStatistics": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "enterpriseValue": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "profitMargins": {
          "yahooFinanceType": "number"
        },
        "floatShares": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "sharesShort": {
          "yahooFinanceType": "number"
        },
        "sharesShortPriorMonth": {
          "yahooFinanceType": "date"
        },
        "sharesShortPreviousMonthDate": {
          "yahooFinanceType": "date"
        },
        "dateShortInterest": {
          "yahooFinanceType": "date"
        },
        "sharesPercentSharesOut": {
          "yahooFinanceType": "number"
        },
        "heldPercentInsiders": {
          "yahooFinanceType": "number"
        },
        "heldPercentInstitutions": {
          "yahooFinanceType": "number"
        },
        "shortRatio": {
          "yahooFinanceType": "number"
        },
        "shortPercentOfFloat": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "impliedSharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "category": {
          "type": [
            "null",
            "string"
          ]
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "fundFamily": {
          "type": [
            "null",
            "string"
          ]
        },
        "legalType": {
          "type": [
            "null",
            "string"
          ]
        },
        "lastFiscalYearEnd": {
          "yahooFinanceType": "date"
        },
        "nextFiscalYearEnd": {
          "yahooFinanceType": "date"
        },
        "mostRecentQuarter": {
          "yahooFinanceType": "date"
        },
        "earningsQuarterlyGrowth": {
          "yahooFinanceType": "number"
        },
        "netIncomeToCommon": {
          "yahooFinanceType": "number"
        },
        "trailingEps": {
          "yahooFinanceType": "number"
        },
        "forwardEps": {
          "yahooFinanceType": "number"
        },
        "pegRatio": {
          "yahooFinanceType": "number"
        },
        "lastSplitFactor": {
          "type": [
            "null",
            "string"
          ]
        },
        "lastSplitDate": {
          "yahooFinanceType": "number"
        },
        "enterpriseToRevenue": {
          "yahooFinanceType": "number"
        },
        "enterpriseToEbitda": {
          "yahooFinanceType": "number"
        },
        "52WeekChange": {
          "yahooFinanceType": "number"
        },
        "SandP52WeekChange": {
          "yahooFinanceType": "number"
        },
        "lastDividendValue": {
          "yahooFinanceType": "number"
        },
        "lastDividendDate": {
          "yahooFinanceType": "date"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "beta3Year": {
          "yahooFinanceType": "number"
        },
        "totalAssets": {
          "yahooFinanceType": "number"
        },
        "yield": {
          "yahooFinanceType": "number"
        },
        "fundInceptionDate": {
          "yahooFinanceType": "date"
        },
        "threeYearAverageReturn": {
          "yahooFinanceType": "number"
        },
        "fiveYearAverageReturn": {
          "yahooFinanceType": "number"
        },
        "morningStarOverallRating": {
          "yahooFinanceType": "number"
        },
        "morningStarRiskRating": {
          "yahooFinanceType": "number"
        },
        "annualReportExpenseRatio": {
          "yahooFinanceType": "number"
        },
        "lastCapGain": {
          "yahooFinanceType": "number"
        },
        "annualHoldingsTurnover": {
          "yahooFinanceType": "number"
        },
        "latestShareClass": {},
        "leadInvestor": {}
      },
      "required": [
        "maxAge",
        "priceHint",
        "category",
        "fundFamily",
        "legalType",
        "lastSplitFactor"
      ],
      "additionalProperties": {}
    },
    "QuoteSummaryEarnings": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "earningsChart": {
          "$ref": "#/definitions/EarningsChart"
        },
        "financialsChart": {
          "$ref": "#/definitions/FinancialsChart"
        },
        "financialCurrency": {
          "type": "string"
        }
      },
      "required": [
        "maxAge",
        "earningsChart",
        "financialsChart"
      ],
      "additionalProperties": {}
    },
    "EarningsChart": {
      "type": "object",
      "properties": {
        "quarterly": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/EarningsChartQuarterly"
          }
        },
        "currentQuarterEstimate": {
          "yahooFinanceType": "number"
        },
        "currentQuarterEstimateDate": {
          "type": "string"
        },
        "currentQuarterEstimateYear": {
          "yahooFinanceType": "number"
        },
        "earningsDate": {
          "type": "array",
          "items": {
            "yahooFinanceType": "date"
          }
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        }
      },
      "required": [
        "quarterly",
        "earningsDate"
      ],
      "additionalProperties": {}
    },
    "EarningsChartQuarterly": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string"
        },
        "actual": {
          "yahooFinanceType": "number"
        },
        "estimate": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "date",
        "estimate"
      ],
      "additionalProperties": {}
    },
    "FinancialsChart": {
      "type": "object",
      "properties": {
        "yearly": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Yearly"
          }
        },
        "quarterly": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FinancialsChartQuarterly"
          }
        }
      },
      "required": [
        "yearly",
        "quarterly"
      ],
      "additionalProperties": {}
    },
    "Yearly": {
      "type": "object",
      "properties": {
        "date": {
          "yahooFinanceType": "number"
        },
        "revenue": {
          "yahooFinanceType": "number"
        },
        "earnings": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "date",
        "revenue",
        "earnings"
      ],
      "additionalProperties": {}
    },
    "FinancialsChartQuarterly": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string"
        },
        "revenue": {
          "yahooFinanceType": "number"
        },
        "earnings": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "date",
        "revenue",
        "earnings"
      ],
      "additionalProperties": {}
    },
    "EarningsHistory": {
      "type": "object",
      "properties": {
        "history": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/EarningsHistoryHistory"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "history",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "EarningsHistoryHistory": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "epsActual": {
          "yahooFinanceType": "number|null"
        },
        "epsEstimate": {
          "yahooFinanceType": "number|null"
        },
        "epsDifference": {
          "yahooFinanceType": "number|null"
        },
        "surprisePercent": {
          "yahooFinanceType": "number|null"
        },
        "quarter": {
          "yahooFinanceType": "date|null"
        },
        "period": {
          "type": "string"
        },
        "currency": {
          "type": "string"
        }
      },
      "required": [
        "maxAge",
        "epsActual",
        "epsEstimate",
        "epsDifference",
        "surprisePercent",
        "quarter",
        "period"
      ],
      "additionalProperties": {}
    },
    "EarningsTrend": {
      "type": "object",
      "properties": {
        "trend": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/EarningsTrendTrend"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "trend",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "EarningsTrendTrend": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "period": {
          "type": "string"
        },
        "endDate": {
          "yahooFinanceType": "date|null"
        },
        "growth": {
          "yahooFinanceType": "number|null"
        },
        "earningsEstimate": {
          "$ref": "#/definitions/EarningsEstimate"
        },
        "revenueEstimate": {
          "$ref": "#/definitions/RevenueEstimate"
        },
        "epsTrend": {
          "$ref": "#/definitions/EpsTrend"
        },
        "epsRevisions": {
          "$ref": "#/definitions/EpsRevisions"
        }
      },
      "required": [
        "maxAge",
        "period",
        "endDate",
        "growth",
        "earningsEstimate",
        "revenueEstimate",
        "epsTrend",
        "epsRevisions"
      ],
      "additionalProperties": {}
    },
    "EarningsEstimate": {
      "type": "object",
      "properties": {
        "avg": {
          "yahooFinanceType": "number|null"
        },
        "low": {
          "yahooFinanceType": "number|null"
        },
        "high": {
          "yahooFinanceType": "number|null"
        },
        "yearAgoEps": {
          "yahooFinanceType": "number|null"
        },
        "numberOfAnalysts": {
          "yahooFinanceType": "number|null"
        },
        "growth": {
          "yahooFinanceType": "number|null"
        },
        "earningsCurrency": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "avg",
        "low",
        "high",
        "yearAgoEps",
        "numberOfAnalysts",
        "growth"
      ],
      "additionalProperties": {}
    },
    "RevenueEstimate": {
      "type": "object",
      "properties": {
        "avg": {
          "yahooFinanceType": "number|null"
        },
        "low": {
          "yahooFinanceType": "number|null"
        },
        "high": {
          "yahooFinanceType": "number|null"
        },
        "numberOfAnalysts": {
          "yahooFinanceType": "number|null"
        },
        "yearAgoRevenue": {
          "yahooFinanceType": "number|null"
        },
        "growth": {
          "yahooFinanceType": "number|null"
        },
        "revenueCurrency": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "avg",
        "low",
        "high",
        "numberOfAnalysts",
        "yearAgoRevenue",
        "growth"
      ],
      "additionalProperties": {}
    },
    "EpsTrend": {
      "type": "object",
      "properties": {
        "current": {
          "yahooFinanceType": "number|null"
        },
        "7daysAgo": {
          "yahooFinanceType": "number|null"
        },
        "30daysAgo": {
          "yahooFinanceType": "number|null"
        },
        "60daysAgo": {
          "yahooFinanceType": "number|null"
        },
        "90daysAgo": {
          "yahooFinanceType": "number|null"
        },
        "epsTrendCurrency": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "current",
        "7daysAgo",
        "30daysAgo",
        "60daysAgo",
        "90daysAgo"
      ],
      "additionalProperties": {}
    },
    "EpsRevisions": {
      "type": "object",
      "properties": {
        "upLast7days": {
          "yahooFinanceType": "number|null"
        },
        "upLast30days": {
          "yahooFinanceType": "number|null"
        },
        "upLast90days": {
          "yahooFinanceType": "number|null"
        },
        "downLast7Days": {
          "yahooFinanceType": "number|null"
        },
        "downLast30days": {
          "yahooFinanceType": "number|null"
        },
        "downLast90days": {
          "yahooFinanceType": "number|null"
        },
        "epsRevisionsCurrency": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "additionalProperties": {}
    },
    "FinancialData": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "currentPrice": {
          "yahooFinanceType": "number"
        },
        "targetHighPrice": {
          "yahooFinanceType": "number"
        },
        "targetLowPrice": {
          "yahooFinanceType": "number"
        },
        "targetMeanPrice": {
          "yahooFinanceType": "number"
        },
        "targetMedianPrice": {
          "yahooFinanceType": "number"
        },
        "recommendationMean": {
          "yahooFinanceType": "number"
        },
        "recommendationKey": {
          "type": "string"
        },
        "numberOfAnalystOpinions": {
          "yahooFinanceType": "number"
        },
        "totalCash": {
          "yahooFinanceType": "number"
        },
        "totalCashPerShare": {
          "yahooFinanceType": "number"
        },
        "ebitda": {
          "yahooFinanceType": "number"
        },
        "totalDebt": {
          "yahooFinanceType": "number"
        },
        "quickRatio": {
          "yahooFinanceType": "number"
        },
        "currentRatio": {
          "yahooFinanceType": "number"
        },
        "totalRevenue": {
          "yahooFinanceType": "number"
        },
        "debtToEquity": {
          "yahooFinanceType": "number"
        },
        "revenuePerShare": {
          "yahooFinanceType": "number"
        },
        "returnOnAssets": {
          "yahooFinanceType": "number"
        },
        "returnOnEquity": {
          "yahooFinanceType": "number"
        },
        "grossProfits": {
          "yahooFinanceType": "number"
        },
        "freeCashflow": {
          "yahooFinanceType": "number"
        },
        "operatingCashflow": {
          "yahooFinanceType": "number"
        },
        "earningsGrowth": {
          "yahooFinanceType": "number"
        },
        "revenueGrowth": {
          "yahooFinanceType": "number"
        },
        "grossMargins": {
          "yahooFinanceType": "number"
        },
        "ebitdaMargins": {
          "yahooFinanceType": "number"
        },
        "operatingMargins": {
          "yahooFinanceType": "number"
        },
        "profitMargins": {
          "yahooFinanceType": "number"
        },
        "financialCurrency": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "maxAge",
        "recommendationKey",
        "financialCurrency"
      ],
      "additionalProperties": {}
    },
    "Ownership": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "ownershipList": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/OwnershipList"
          }
        }
      },
      "required": [
        "maxAge",
        "ownershipList"
      ],
      "additionalProperties": {}
    },
    "OwnershipList": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "reportDate": {
          "yahooFinanceType": "date"
        },
        "organization": {
          "type": "string"
        },
        "pctHeld": {
          "yahooFinanceType": "number"
        },
        "position": {
          "yahooFinanceType": "number"
        },
        "value": {
          "yahooFinanceType": "number"
        },
        "pctChange": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge",
        "reportDate",
        "organization",
        "pctHeld",
        "position",
        "value"
      ],
      "additionalProperties": {}
    },
    "FundPerformance": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "loadAdjustedReturns": {
          "$ref": "#/definitions/PeriodRange"
        },
        "rankInCategory": {
          "$ref": "#/definitions/PeriodRange"
        },
        "performanceOverview": {
          "$ref": "#/definitions/FundPerformancePerformanceOverview"
        },
        "performanceOverviewCat": {
          "$ref": "#/definitions/FundPerformancePerformanceOverviewCat"
        },
        "trailingReturns": {
          "$ref": "#/definitions/FundPerformanceTrailingReturns"
        },
        "trailingReturnsNav": {
          "$ref": "#/definitions/FundPerformanceTrailingReturns"
        },
        "trailingReturnsCat": {
          "$ref": "#/definitions/FundPerformanceTrailingReturns"
        },
        "annualTotalReturns": {
          "$ref": "#/definitions/FundPerformanceReturns"
        },
        "pastQuarterlyReturns": {
          "$ref": "#/definitions/FundPerformanceReturns"
        },
        "riskOverviewStatistics": {
          "$ref": "#/definitions/FundPerformanceRiskOverviewStats"
        },
        "riskOverviewStatisticsCat": {
          "$ref": "#/definitions/FundPerformanceRiskOverviewStatsCat"
        },
        "fundCategoryName": {
          "type": "string"
        }
      },
      "required": [
        "maxAge",
        "performanceOverview",
        "performanceOverviewCat",
        "trailingReturns",
        "trailingReturnsNav",
        "trailingReturnsCat",
        "annualTotalReturns",
        "pastQuarterlyReturns",
        "riskOverviewStatistics",
        "riskOverviewStatisticsCat"
      ],
      "additionalProperties": {}
    },
    "PeriodRange": {
      "type": "object",
      "properties": {
        "asOfDate": {
          "yahooFinanceType": "date"
        },
        "ytd": {
          "yahooFinanceType": "number"
        },
        "oneMonth": {
          "yahooFinanceType": "number"
        },
        "threeMonth": {
          "yahooFinanceType": "number"
        },
        "oneYear": {
          "yahooFinanceType": "number"
        },
        "threeYear": {
          "yahooFinanceType": "number"
        },
        "fiveYear": {
          "yahooFinanceType": "number"
        },
        "tenYear": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": {}
    },
    "FundPerformancePerformanceOverview": {
      "type": "object",
      "properties": {
        "asOfDate": {
          "yahooFinanceType": "date"
        },
        "ytdReturnPct": {
          "yahooFinanceType": "number"
        },
        "oneYearTotalReturn": {
          "yahooFinanceType": "number"
        },
        "threeYearTotalReturn": {
          "yahooFinanceType": "number"
        },
        "fiveYrAvgReturnPct": {
          "yahooFinanceType": "number"
        },
        "morningStarReturnRating": {
          "yahooFinanceType": "number"
        },
        "numYearsUp": {
          "yahooFinanceType": "number"
        },
        "numYearsDown": {
          "yahooFinanceType": "number"
        },
        "bestOneYrTotalReturn": {
          "yahooFinanceType": "number"
        },
        "worstOneYrTotalReturn": {
          "yahooFinanceType": "number"
        },
        "bestThreeYrTotalReturn": {
          "yahooFinanceType": "number"
        },
        "worstThreeYrTotalReturn": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": {}
    },
    "FundPerformancePerformanceOverviewCat": {
      "type": "object",
      "properties": {
        "ytdReturnPct": {
          "yahooFinanceType": "number"
        },
        "fiveYrAvgReturnPct": {
          "yahooFinanceType": "number"
        },
        "oneYearTotalReturn": {
          "yahooFinanceType": "number"
        },
        "threeYearTotalReturn": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": {}
    },
    "FundPerformanceTrailingReturns": {
      "type": "object",
      "properties": {
        "asOfDate": {
          "yahooFinanceType": "date"
        },
        "ytd": {
          "yahooFinanceType": "number"
        },
        "oneMonth": {
          "yahooFinanceType": "number"
        },
        "threeMonth": {
          "yahooFinanceType": "number"
        },
        "oneYear": {
          "yahooFinanceType": "number"
        },
        "threeYear": {
          "yahooFinanceType": "number"
        },
        "fiveYear": {
          "yahooFinanceType": "number"
        },
        "tenYear": {
          "yahooFinanceType": "number"
        },
        "lastBullMkt": {
          "yahooFinanceType": "number"
        },
        "lastBearMkt": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": {
        "anyOf": [
          {},
          {}
        ]
      }
    },
    "FundPerformanceReturns": {
      "type": "object",
      "properties": {
        "returns": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FundPerformanceReturnsRow"
          }
        },
        "returnsCat": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FundPerformanceReturnsRow"
          }
        }
      },
      "required": [
        "returns"
      ],
      "additionalProperties": {}
    },
    "FundPerformanceReturnsRow": {
      "type": "object",
      "properties": {
        "year": {
          "yahooFinanceType": "number"
        },
        "annualValue": {
          "yahooFinanceType": "number"
        },
        "q1": {
          "yahooFinanceType": "number"
        },
        "q2": {
          "yahooFinanceType": "number"
        },
        "q3": {
          "yahooFinanceType": "number"
        },
        "q4": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "year"
      ],
      "additionalProperties": {}
    },
    "FundPerformanceRiskOverviewStats": {
      "type": "object",
      "properties": {
        "riskStatistics": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FundPerformanceRiskOverviewStatsRow"
          }
        },
        "riskRating": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "riskStatistics"
      ],
      "additionalProperties": {}
    },
    "FundPerformanceRiskOverviewStatsRow": {
      "type": "object",
      "properties": {
        "year": {
          "type": "string"
        },
        "alpha": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "meanAnnualReturn": {
          "yahooFinanceType": "number"
        },
        "rSquared": {
          "yahooFinanceType": "number"
        },
        "stdDev": {
          "yahooFinanceType": "number"
        },
        "sharpeRatio": {
          "yahooFinanceType": "number"
        },
        "treynorRatio": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "year",
        "alpha",
        "beta",
        "meanAnnualReturn",
        "rSquared",
        "sharpeRatio",
        "treynorRatio"
      ],
      "additionalProperties": {}
    },
    "FundPerformanceRiskOverviewStatsCat": {
      "type": "object",
      "properties": {
        "riskStatisticsCat": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FundPerformanceRiskOverviewStatsRow"
          }
        }
      },
      "required": [
        "riskStatisticsCat"
      ],
      "additionalProperties": {}
    },
    "FundProfile": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "styleBoxUrl": {
          "type": [
            "null",
            "string"
          ]
        },
        "family": {
          "type": [
            "null",
            "string"
          ]
        },
        "categoryName": {
          "type": [
            "null",
            "string"
          ]
        },
        "legalType": {
          "type": [
            "null",
            "string"
          ]
        },
        "managementInfo": {
          "$ref": "#/definitions/FundProfileManagementInfo"
        },
        "feesExpensesInvestment": {
          "$ref": "#/definitions/FundProfileFeesExpensesInvestment"
        },
        "feesExpensesInvestmentCat": {
          "$ref": "#/definitions/FundProfileFeesExpensesInvestmentCat"
        },
        "brokerages": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/FundProfileBrokerage"
          }
        },
        "initInvestment": {
          "yahooFinanceType": "number"
        },
        "initIraInvestment": {
          "yahooFinanceType": "number"
        },
        "initAipInvestment": {
          "yahooFinanceType": "number"
        },
        "subseqInvestment": {
          "yahooFinanceType": "number"
        },
        "subseqIraInvestment": {
          "yahooFinanceType": "number"
        },
        "subseqAipInvestment": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge",
        "family",
        "categoryName",
        "legalType"
      ],
      "additionalProperties": {}
    },
    "FundProfileManagementInfo": {
      "type": "object",
      "properties": {
        "managerName": {
          "type": [
            "null",
            "string"
          ]
        },
        "managerBio": {
          "type": [
            "null",
            "string"
          ]
        },
        "startdate": {
          "yahooFinanceType": "date"
        }
      },
      "required": [
        "managerName",
        "managerBio"
      ],
      "additionalProperties": {}
    },
    "FundProfileFeesExpensesInvestment": {
      "type": "object",
      "properties": {
        "annualHoldingsTurnover": {
          "yahooFinanceType": "number"
        },
        "annualReportExpenseRatio": {
          "yahooFinanceType": "number"
        },
        "grossExpRatio": {
          "yahooFinanceType": "number"
        },
        "netExpRatio": {
          "yahooFinanceType": "number"
        },
        "projectionValues": {
          "type": "object"
        },
        "totalNetAssets": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "projectionValues"
      ],
      "additionalProperties": {}
    },
    "FundProfileFeesExpensesInvestmentCat": {
      "type": "object",
      "properties": {
        "annualHoldingsTurnover": {
          "yahooFinanceType": "number"
        },
        "annualReportExpenseRatio": {
          "yahooFinanceType": "number"
        },
        "grossExpRatio": {
          "yahooFinanceType": "number"
        },
        "netExpRatio": {
          "yahooFinanceType": "number"
        },
        "totalNetAssets": {
          "yahooFinanceType": "number"
        },
        "projectionValuesCat": {
          "type": "object"
        }
      },
      "required": [
        "projectionValuesCat"
      ],
      "additionalProperties": {
        "anyOf": [
          {},
          {}
        ]
      }
    },
    "FundProfileBrokerage": {
      "type": "object",
      "additionalProperties": {}
    },
    "IncomeStatementHistory": {
      "type": "object",
      "properties": {
        "incomeStatementHistory": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/IncomeStatementHistoryElement"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "incomeStatementHistory",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "IncomeStatementHistoryElement": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "endDate": {
          "yahooFinanceType": "date"
        },
        "totalRevenue": {
          "yahooFinanceType": "number"
        },
        "costOfRevenue": {
          "yahooFinanceType": "number"
        },
        "grossProfit": {
          "yahooFinanceType": "number"
        },
        "researchDevelopment": {
          "yahooFinanceType": "number|null"
        },
        "sellingGeneralAdministrative": {
          "yahooFinanceType": "number|null"
        },
        "nonRecurring": {
          "yahooFinanceType": "number|null"
        },
        "otherOperatingExpenses": {
          "yahooFinanceType": "number|null"
        },
        "totalOperatingExpenses": {
          "yahooFinanceType": "number"
        },
        "operatingIncome": {
          "yahooFinanceType": "number|null"
        },
        "totalOtherIncomeExpenseNet": {
          "yahooFinanceType": "number|null"
        },
        "ebit": {
          "yahooFinanceType": "number"
        },
        "interestExpense": {
          "yahooFinanceType": "number|null"
        },
        "incomeBeforeTax": {
          "yahooFinanceType": "number|null"
        },
        "incomeTaxExpense": {
          "yahooFinanceType": "number"
        },
        "minorityInterest": {
          "yahooFinanceType": "number|null"
        },
        "netIncomeFromContinuingOps": {
          "yahooFinanceType": "number|null"
        },
        "discontinuedOperations": {
          "yahooFinanceType": "number|null"
        },
        "extraordinaryItems": {
          "yahooFinanceType": "number|null"
        },
        "effectOfAccountingCharges": {
          "yahooFinanceType": "number|null"
        },
        "otherItems": {
          "yahooFinanceType": "number|null"
        },
        "netIncome": {
          "yahooFinanceType": "number"
        },
        "netIncomeApplicableToCommonShares": {
          "yahooFinanceType": "number|null"
        }
      },
      "required": [
        "maxAge",
        "endDate",
        "totalRevenue",
        "costOfRevenue",
        "grossProfit",
        "researchDevelopment",
        "sellingGeneralAdministrative",
        "nonRecurring",
        "otherOperatingExpenses",
        "totalOperatingExpenses",
        "operatingIncome",
        "totalOtherIncomeExpenseNet",
        "ebit",
        "interestExpense",
        "incomeBeforeTax",
        "incomeTaxExpense",
        "minorityInterest",
        "netIncomeFromContinuingOps",
        "discontinuedOperations",
        "extraordinaryItems",
        "effectOfAccountingCharges",
        "otherItems",
        "netIncome",
        "netIncomeApplicableToCommonShares"
      ],
      "additionalProperties": {}
    },
    "IndexTrend": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "symbol": {
          "type": "string"
        },
        "peRatio": {
          "yahooFinanceType": "number"
        },
        "pegRatio": {
          "yahooFinanceType": "number"
        },
        "estimates": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Estimate"
          }
        }
      },
      "required": [
        "maxAge",
        "symbol",
        "estimates"
      ],
      "additionalProperties": {}
    },
    "Estimate": {
      "type": "object",
      "properties": {
        "period": {
          "type": "string"
        },
        "growth": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "period"
      ],
      "additionalProperties": {}
    },
    "Trend": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "symbol": {
          "type": "null"
        },
        "estimates": {
          "type": "array",
          "items": {}
        }
      },
      "required": [
        "maxAge",
        "symbol",
        "estimates"
      ],
      "additionalProperties": {}
    },
    "Holders": {
      "type": "object",
      "properties": {
        "holders": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Holder"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "holders",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "Holder": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "name": {
          "type": "string"
        },
        "relation": {
          "anyOf": [
            {
              "$ref": "#/definitions/Relation"
            },
            {
              "type": "string"
            }
          ]
        },
        "url": {
          "type": "string"
        },
        "transactionDescription": {
          "type": "string"
        },
        "latestTransDate": {
          "yahooFinanceType": "date"
        },
        "positionDirect": {
          "yahooFinanceType": "number"
        },
        "positionDirectDate": {
          "yahooFinanceType": "date"
        },
        "positionIndirect": {
          "yahooFinanceType": "number"
        },
        "positionIndirectDate": {
          "yahooFinanceType": "date"
        },
        "positionSummaryDate": {
          "yahooFinanceType": "date"
        }
      },
      "required": [
        "maxAge",
        "name",
        "relation",
        "url",
        "transactionDescription",
        "latestTransDate"
      ],
      "additionalProperties": {}
    },
    "Relation": {
      "type": "string",
      "enum": [
        "Chairman of the Board",
        "Chief Executive Officer",
        "Chief Financial Officer",
        "Chief Operating Officer",
        "Chief Technology Officer",
        "Director",
        "Director (Independent)",
        "",
        "General Counsel",
        "Independent Non-Executive Director",
        "Officer",
        "President"
      ]
    },
    "InsiderTransactions": {
      "type": "object",
      "properties": {
        "transactions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Transaction"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "transactions",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "Transaction": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "shares": {
          "yahooFinanceType": "number"
        },
        "filerUrl": {
          "type": "string"
        },
        "transactionText": {
          "type": "string"
        },
        "filerName": {
          "type": "string"
        },
        "filerRelation": {
          "anyOf": [
            {
              "$ref": "#/definitions/Relation"
            },
            {
              "type": "string"
            }
          ]
        },
        "moneyText": {
          "type": "string"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "ownership": {
          "anyOf": [
            {
              "$ref": "#/definitions/OwnershipEnum"
            },
            {
              "type": "string"
            }
          ]
        },
        "value": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge",
        "shares",
        "filerUrl",
        "transactionText",
        "filerName",
        "filerRelation",
        "moneyText",
        "startDate",
        "ownership"
      ],
      "additionalProperties": {}
    },
    "OwnershipEnum": {
      "type": "string",
      "enum": [
        "D",
        "I"
      ]
    },
    "MajorHoldersBreakdown": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "insidersPercentHeld": {
          "yahooFinanceType": "number"
        },
        "institutionsPercentHeld": {
          "yahooFinanceType": "number"
        },
        "institutionsFloatPercentHeld": {
          "yahooFinanceType": "number"
        },
        "institutionsCount": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "NetSharePurchaseActivity": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "period": {
          "type": "string"
        },
        "buyInfoCount": {
          "yahooFinanceType": "number"
        },
        "buyInfoShares": {
          "yahooFinanceType": "number"
        },
        "buyPercentInsiderShares": {
          "yahooFinanceType": "number"
        },
        "sellInfoCount": {
          "yahooFinanceType": "number"
        },
        "sellInfoShares": {
          "yahooFinanceType": "number"
        },
        "sellPercentInsiderShares": {
          "yahooFinanceType": "number"
        },
        "netInfoCount": {
          "yahooFinanceType": "number"
        },
        "netInfoShares": {
          "yahooFinanceType": "number"
        },
        "netPercentInsiderShares": {
          "yahooFinanceType": "number"
        },
        "totalInsiderShares": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge",
        "period",
        "buyInfoCount",
        "buyInfoShares",
        "sellInfoCount",
        "netInfoCount",
        "netInfoShares",
        "totalInsiderShares"
      ],
      "additionalProperties": {}
    },
    "Price": {
      "type": "object",
      "properties": {
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "exchange": {
          "type": "string"
        },
        "exchangeName": {
          "type": "string"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "date"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketSource": {
          "type": "string"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        },
        "preMarketSource": {
          "type": "string"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "date"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "regularMarketSource": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": [
            "null",
            "string"
          ]
        },
        "shortName": {
          "type": [
            "null",
            "string"
          ]
        },
        "longName": {
          "type": [
            "null",
            "string"
          ]
        },
        "lastMarket": {
          "type": [
            "null",
            "string"
          ]
        },
        "marketState": {
          "type": "string"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "currency": {
          "type": "string"
        },
        "currencySymbol": {
          "type": "string"
        },
        "fromCurrency": {
          "type": [
            "string",
            "null"
          ]
        },
        "toCurrency": {
          "type": [
            "string",
            "null"
          ]
        },
        "volume24Hr": {
          "yahooFinanceType": "number"
        },
        "volumeAllCurrencies": {
          "yahooFinanceType": "number"
        },
        "circulatingSupply": {
          "yahooFinanceType": "number"
        },
        "expireDate": {
          "yahooFinanceType": "date"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge",
        "priceHint",
        "quoteType",
        "symbol",
        "underlyingSymbol",
        "shortName",
        "longName",
        "lastMarket",
        "fromCurrency"
      ],
      "additionalProperties": {}
    },
    "QuoteType": {
      "type": "object",
      "properties": {
        "exchange": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "symbol": {
          "type": "string"
        },
        "underlyingSymbol": {
          "type": "string"
        },
        "shortName": {
          "type": [
            "null",
            "string"
          ]
        },
        "longName": {
          "type": [
            "null",
            "string"
          ]
        },
        "firstTradeDateEpochUtc": {
          "yahooFinanceType": "date|null"
        },
        "timeZoneFullName": {
          "type": "string"
        },
        "timeZoneShortName": {
          "type": "string"
        },
        "uuid": {
          "type": "string"
        },
        "messageBoardId": {
          "type": [
            "null",
            "string"
          ]
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "exchange",
        "quoteType",
        "symbol",
        "underlyingSymbol",
        "shortName",
        "timeZoneFullName",
        "timeZoneShortName",
        "uuid",
        "gmtOffSetMilliseconds",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "RecommendationTrend": {
      "type": "object",
      "properties": {
        "trend": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/RecommendationTrendTrend"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "trend",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "RecommendationTrendTrend": {
      "type": "object",
      "properties": {
        "period": {
          "type": "string"
        },
        "strongBuy": {
          "yahooFinanceType": "number"
        },
        "buy": {
          "yahooFinanceType": "number"
        },
        "hold": {
          "yahooFinanceType": "number"
        },
        "sell": {
          "yahooFinanceType": "number"
        },
        "strongSell": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "period",
        "strongBuy",
        "buy",
        "hold",
        "sell",
        "strongSell"
      ],
      "additionalProperties": {}
    },
    "SECFilings": {
      "type": "object",
      "properties": {
        "filings": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Filing"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "filings",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "Filing": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string"
        },
        "epochDate": {
          "yahooFinanceType": "date"
        },
        "type": {
          "type": "string",
          "enum": [
            "10-K",
            "10-Q",
            "8-K",
            "8-K/A",
            "10-K/A",
            "10-Q/A",
            "SD",
            "PX14A6G",
            "SC 13G/A",
            "DEFA14A",
            "25-NSE",
            "S-8 POS",
            "6-K",
            "F-3ASR",
            "SC 13D/A",
            "20-F",
            "425",
            "SC14D9C",
            "SC 13G",
            "S-8",
            "DEF 14A",
            "F-10",
            "S-3ASR",
            "CORRESP",
            "PX14A6N",
            "N-PX",
            "ARS",
            "PRE 14A",
            "F-6EF",
            "S-3/A",
            "S-3",
            "POS AM",
            "IRANNOTICE",
            "20-F/A",
            "11-K",
            "DEFR14A"
          ]
        },
        "title": {
          "type": "string"
        },
        "edgarUrl": {
          "type": "string"
        },
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "url": {
          "type": "string"
        },
        "exhibits": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string"
              },
              "url": {
                "type": "string"
              },
              "downloadUrl": {
                "type": "string"
              }
            },
            "required": [
              "type",
              "url"
            ],
            "additionalProperties": false
          }
        }
      },
      "required": [
        "date",
        "epochDate",
        "type",
        "title",
        "edgarUrl",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "SummaryDetail": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "previousClose": {
          "yahooFinanceType": "number"
        },
        "open": {
          "yahooFinanceType": "number"
        },
        "dayLow": {
          "yahooFinanceType": "number"
        },
        "dayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "dividendRate": {
          "yahooFinanceType": "number"
        },
        "dividendYield": {
          "yahooFinanceType": "number"
        },
        "exDividendDate": {
          "yahooFinanceType": "date"
        },
        "payoutRatio": {
          "yahooFinanceType": "number"
        },
        "fiveYearAvgDividendYield": {
          "yahooFinanceType": "number"
        },
        "beta": {
          "yahooFinanceType": "number"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "volume": {
          "yahooFinanceType": "number"
        },
        "averageVolume": {
          "yahooFinanceType": "number"
        },
        "averageVolume10days": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "priceToSalesTrailing12Months": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "currency": {
          "type": "string"
        },
        "algorithm": {
          "type": "null"
        },
        "tradeable": {
          "type": "boolean"
        },
        "yield": {
          "yahooFinanceType": "number"
        },
        "totalAssets": {
          "yahooFinanceType": "number"
        },
        "navPrice": {
          "yahooFinanceType": "number"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "fromCurrency": {
          "type": [
            "string",
            "null"
          ]
        },
        "toCurrency": {
          "type": [
            "string",
            "null"
          ]
        },
        "lastMarket": {
          "type": [
            "string",
            "null"
          ]
        },
        "volume24Hr": {
          "yahooFinanceType": "number"
        },
        "volumeAllCurrencies": {
          "yahooFinanceType": "number"
        },
        "circulatingSupply": {
          "yahooFinanceType": "number"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "coinMarketCapLink": {
          "type": [
            "string",
            "null"
          ]
        },
        "expireDate": {
          "yahooFinanceType": "date"
        },
        "openInterest": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge",
        "priceHint",
        "currency",
        "algorithm",
        "tradeable",
        "fromCurrency",
        "lastMarket"
      ],
      "additionalProperties": {}
    },
    "SummaryProfile": {
      "type": "object",
      "properties": {
        "address1": {
          "type": "string"
        },
        "address2": {
          "type": "string"
        },
        "address3": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "fax": {
          "type": "string"
        },
        "website": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "industryDisp": {
          "type": "string"
        },
        "sector": {
          "type": "string"
        },
        "sectorDisp": {
          "type": "string"
        },
        "longBusinessSummary": {
          "type": "string"
        },
        "fullTimeEmployees": {
          "yahooFinanceType": "number"
        },
        "companyOfficers": {
          "type": "array",
          "items": {}
        },
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "twitter": {
          "type": "string"
        },
        "industryKey": {
          "type": "string"
        },
        "sectorKey": {
          "type": "string"
        },
        "irWebsite": {
          "type": "string"
        },
        "executiveTeam": {
          "type": "array",
          "items": {}
        },
        "name": {
          "type": "string"
        },
        "startDate": {
          "yahooFinanceType": "date"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "companyOfficers",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "TopHoldings": {
      "type": "object",
      "properties": {
        "maxAge": {
          "yahooFinanceType": "number"
        },
        "stockPosition": {
          "yahooFinanceType": "number"
        },
        "bondPosition": {
          "yahooFinanceType": "number"
        },
        "holdings": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TopHoldingsHolding"
          }
        },
        "equityHoldings": {
          "$ref": "#/definitions/TopHoldingsEquityHoldings"
        },
        "bondHoldings": {
          "type": "object"
        },
        "bondRatings": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TopHoldingsBondRating"
          }
        },
        "sectorWeightings": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TopHoldingsSectorWeighting"
          }
        },
        "cashPosition": {
          "yahooFinanceType": "number"
        },
        "otherPosition": {
          "yahooFinanceType": "number"
        },
        "preferredPosition": {
          "yahooFinanceType": "number"
        },
        "convertiblePosition": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "maxAge",
        "holdings",
        "equityHoldings",
        "bondHoldings",
        "bondRatings",
        "sectorWeightings"
      ],
      "additionalProperties": {}
    },
    "TopHoldingsHolding": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "holdingName": {
          "type": "string"
        },
        "holdingPercent": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "symbol",
        "holdingName",
        "holdingPercent"
      ],
      "additionalProperties": {}
    },
    "TopHoldingsEquityHoldings": {
      "type": "object",
      "properties": {
        "medianMarketCap": {
          "yahooFinanceType": "number"
        },
        "medianMarketCapCat": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "priceToBookCat": {
          "yahooFinanceType": "number"
        },
        "priceToCashflow": {
          "yahooFinanceType": "number"
        },
        "priceToCashflowCat": {
          "yahooFinanceType": "number"
        },
        "priceToEarnings": {
          "yahooFinanceType": "number"
        },
        "priceToEarningsCat": {
          "yahooFinanceType": "number"
        },
        "priceToSales": {
          "yahooFinanceType": "number"
        },
        "priceToSalesCat": {
          "yahooFinanceType": "number"
        },
        "threeYearEarningsGrowth": {
          "yahooFinanceType": "number"
        },
        "threeYearEarningsGrowthCat": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "priceToBook",
        "priceToCashflow",
        "priceToEarnings",
        "priceToSales"
      ],
      "additionalProperties": {}
    },
    "TopHoldingsBondRating": {
      "type": "object",
      "properties": {
        "a": {
          "yahooFinanceType": "number"
        },
        "aa": {
          "yahooFinanceType": "number"
        },
        "aaa": {
          "yahooFinanceType": "number"
        },
        "other": {
          "yahooFinanceType": "number"
        },
        "b": {
          "yahooFinanceType": "number"
        },
        "bb": {
          "yahooFinanceType": "number"
        },
        "bbb": {
          "yahooFinanceType": "number"
        },
        "below_b": {
          "yahooFinanceType": "number"
        },
        "us_government": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": {}
    },
    "TopHoldingsSectorWeighting": {
      "type": "object",
      "properties": {
        "realestate": {
          "yahooFinanceType": "number"
        },
        "consumer_cyclical": {
          "yahooFinanceType": "number"
        },
        "basic_materials": {
          "yahooFinanceType": "number"
        },
        "consumer_defensive": {
          "yahooFinanceType": "number"
        },
        "technology": {
          "yahooFinanceType": "number"
        },
        "communication_services": {
          "yahooFinanceType": "number"
        },
        "financial_services": {
          "yahooFinanceType": "number"
        },
        "utilities": {
          "yahooFinanceType": "number"
        },
        "industrials": {
          "yahooFinanceType": "number"
        },
        "energy": {
          "yahooFinanceType": "number"
        },
        "healthcare": {
          "yahooFinanceType": "number"
        }
      },
      "additionalProperties": {}
    },
    "UpgradeDowngradeHistory": {
      "type": "object",
      "properties": {
        "history": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/UpgradeDowngradeHistoryHistory"
          }
        },
        "maxAge": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "history",
        "maxAge"
      ],
      "additionalProperties": {}
    },
    "UpgradeDowngradeHistoryHistory": {
      "type": "object",
      "properties": {
        "epochGradeDate": {
          "yahooFinanceType": "date"
        },
        "firm": {
          "type": "string"
        },
        "toGrade": {
          "$ref": "#/definitions/Grade"
        },
        "fromGrade": {
          "$ref": "#/definitions/Grade"
        },
        "action": {
          "$ref": "#/definitions/Action"
        }
      },
      "required": [
        "epochGradeDate",
        "firm",
        "toGrade",
        "action"
      ],
      "additionalProperties": {}
    },
    "Grade": {
      "type": "string",
      "enum": [
        "Accumulate",
        "Add",
        "Average",
        "Below Average",
        "Buy",
        "Conviction Buy",
        "",
        "Equal-Weight",
        "Fair Value",
        "Equal-weight",
        "Long-term Buy",
        "Hold",
        "Long-Term Buy",
        "Market Outperform",
        "Market Perform",
        "Mixed",
        "Negative",
        "Neutral",
        "In-Line",
        "Outperform",
        "Overweight",
        "Peer Perform",
        "Perform",
        "Positive",
        "Reduce",
        "Sector Outperform",
        "Sector Perform",
        "Sector Weight",
        "Sell",
        "Strong Buy",
        "Top Pick",
        "Underperform",
        "Underperformer",
        "Underweight",
        "Trim",
        "Above Average",
        "In-line",
        "Outperformer",
        "OVerweight",
        "Cautious",
        "Market Weight",
        "Sector Underperform",
        "Market Underperform",
        "Peer perform",
        "Gradually Accumulate",
        "Action List Buy",
        "Performer",
        "Sector Performer",
        "Speculative Buy",
        "Strong Sell",
        "Speculative Hold",
        "Not Rated",
        "Hold Neutral",
        "Developing",
        "buy",
        "HOld",
        "Trading Sell",
        "Tender",
        "market perform",
        "BUy"
      ]
    },
    "Action": {
      "type": "string",
      "enum": [
        "down",
        "init",
        "main",
        "reit",
        "up"
      ]
    },
    "QuoteSummaryModules": {
      "type": "string",
      "enum": [
        "assetProfile",
        "balanceSheetHistory",
        "balanceSheetHistoryQuarterly",
        "calendarEvents",
        "cashflowStatementHistory",
        "cashflowStatementHistoryQuarterly",
        "defaultKeyStatistics",
        "earnings",
        "earningsHistory",
        "earningsTrend",
        "financialData",
        "fundOwnership",
        "fundPerformance",
        "fundProfile",
        "incomeStatementHistory",
        "incomeStatementHistoryQuarterly",
        "indexTrend",
        "industryTrend",
        "insiderHolders",
        "insiderTransactions",
        "institutionOwnership",
        "majorDirectHolders",
        "majorHoldersBreakdown",
        "netSharePurchaseActivity",
        "price",
        "quoteType",
        "recommendationTrend",
        "secFilings",
        "sectorTrend",
        "summaryDetail",
        "summaryProfile",
        "topHoldings",
        "upgradeDowngradeHistory"
      ]
    },
    "QuoteSummaryOptions": {
      "type": "object",
      "properties": {
        "formatted": {
          "type": "boolean"
        },
        "modules": {
          "anyOf": [
            {
              "type": "array",
              "items": {
                "$ref": "#/definitions/QuoteSummaryModules"
              }
            },
            {
              "type": "string",
              "const": "all"
            }
          ]
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof quoteSummary>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "symbol": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/QuoteSummaryOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this",
        "symbol"
      ],
      "additionalProperties": false
    },
    "RecommendationsBySymbolResponse": {
      "type": "object",
      "properties": {
        "recommendedSymbols": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "score": {
                "yahooFinanceType": "number"
              },
              "symbol": {
                "type": "string"
              }
            },
            "required": [
              "score",
              "symbol"
            ],
            "additionalProperties": {}
          }
        },
        "symbol": {
          "type": "string"
        }
      },
      "required": [
        "recommendedSymbols",
        "symbol"
      ],
      "additionalProperties": {}
    },
    "RecommendationsBySymbolResponseArray": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/RecommendationsBySymbolResponse"
      }
    },
    "RecommendationsBySymbolOptions": {
      "type": "object",
      "additionalProperties": {
        "not": {}
      }
    },
    "NamedParameters<typeof recommendationsBySymbol>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "query": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          ]
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/RecommendationsBySymbolOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this",
        "query"
      ],
      "additionalProperties": false
    },
    "ScreenerResult": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "canonicalName": {
          "type": "string"
        },
        "criteriaMeta": {
          "$ref": "#/definitions/ScreenerCriteriaMeta"
        },
        "rawCriteria": {
          "type": "string"
        },
        "start": {
          "yahooFinanceType": "number"
        },
        "count": {
          "yahooFinanceType": "number"
        },
        "total": {
          "yahooFinanceType": "number"
        },
        "quotes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ScreenerQuote"
          }
        },
        "useRecords": {
          "type": "boolean"
        },
        "predefinedScr": {
          "type": "boolean"
        },
        "versionId": {
          "yahooFinanceType": "number"
        },
        "creationDate": {
          "yahooFinanceType": "number"
        },
        "lastUpdated": {
          "yahooFinanceType": "number"
        },
        "isPremium": {
          "type": "boolean"
        },
        "iconUrl": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "title",
        "description",
        "canonicalName",
        "criteriaMeta",
        "rawCriteria",
        "start",
        "count",
        "total",
        "quotes",
        "useRecords",
        "predefinedScr",
        "versionId",
        "creationDate",
        "lastUpdated",
        "isPremium",
        "iconUrl"
      ],
      "additionalProperties": false
    },
    "ScreenerCriteriaMeta": {
      "type": "object",
      "properties": {
        "size": {
          "yahooFinanceType": "number"
        },
        "offset": {
          "yahooFinanceType": "number"
        },
        "sortField": {
          "type": "string"
        },
        "sortType": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "criteria": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ScreenerCriterum"
          }
        },
        "topOperator": {
          "type": "string"
        }
      },
      "required": [
        "size",
        "offset",
        "sortField",
        "sortType",
        "quoteType",
        "criteria",
        "topOperator"
      ],
      "additionalProperties": false
    },
    "ScreenerCriterum": {
      "type": "object",
      "properties": {
        "field": {
          "type": "string"
        },
        "operators": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "values": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "labelsSelected": {
          "type": "array",
          "items": {
            "yahooFinanceType": "number"
          }
        },
        "dependentValues": {
          "type": "array",
          "items": {}
        },
        "subField": {
          "type": "null"
        }
      },
      "required": [
        "field",
        "operators",
        "values",
        "labelsSelected",
        "dependentValues"
      ],
      "additionalProperties": false
    },
    "ScreenerQuote": {
      "type": "object",
      "properties": {
        "language": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quoteType": {
          "type": "string"
        },
        "typeDisp": {
          "type": "string"
        },
        "quoteSourceName": {
          "type": "string"
        },
        "triggerable": {
          "type": "boolean"
        },
        "customPriceAlertConfidence": {
          "type": "string"
        },
        "lastCloseTevEbitLtm": {
          "yahooFinanceType": "number"
        },
        "lastClosePriceToNNWCPerShare": {
          "yahooFinanceType": "number"
        },
        "firstTradeDateMilliseconds": {
          "yahooFinanceType": "number"
        },
        "priceHint": {
          "yahooFinanceType": "number"
        },
        "postMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "postMarketTime": {
          "yahooFinanceType": "number"
        },
        "postMarketPrice": {
          "yahooFinanceType": "number"
        },
        "postMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketChange": {
          "yahooFinanceType": "number"
        },
        "regularMarketTime": {
          "yahooFinanceType": "number"
        },
        "regularMarketPrice": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayHigh": {
          "yahooFinanceType": "number"
        },
        "regularMarketDayRange": {
          "type": "string"
        },
        "currency": {
          "type": "string"
        },
        "regularMarketDayLow": {
          "yahooFinanceType": "number"
        },
        "regularMarketVolume": {
          "yahooFinanceType": "number"
        },
        "regularMarketPreviousClose": {
          "yahooFinanceType": "number"
        },
        "bid": {
          "yahooFinanceType": "number"
        },
        "ask": {
          "yahooFinanceType": "number"
        },
        "bidSize": {
          "yahooFinanceType": "number"
        },
        "askSize": {
          "yahooFinanceType": "number"
        },
        "market": {
          "type": "string"
        },
        "messageBoardId": {
          "type": "string"
        },
        "fullExchangeName": {
          "type": "string"
        },
        "longName": {
          "type": "string"
        },
        "financialCurrency": {
          "type": "string"
        },
        "regularMarketOpen": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume3Month": {
          "yahooFinanceType": "number"
        },
        "averageDailyVolume10Day": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekLowChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekRange": {
          "type": "string"
        },
        "fiftyTwoWeekHighChange": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHighChangePercent": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekChangePercent": {
          "yahooFinanceType": "number"
        },
        "earningsTimestamp": {
          "yahooFinanceType": "number"
        },
        "earningsTimestampStart": {
          "yahooFinanceType": "number"
        },
        "earningsTimestampEnd": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendRate": {
          "yahooFinanceType": "number"
        },
        "trailingAnnualDividendYield": {
          "yahooFinanceType": "number"
        },
        "marketState": {
          "type": "string"
        },
        "epsTrailingTwelveMonths": {
          "yahooFinanceType": "number"
        },
        "epsForward": {
          "yahooFinanceType": "number"
        },
        "epsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "priceEpsCurrentYear": {
          "yahooFinanceType": "number"
        },
        "sharesOutstanding": {
          "yahooFinanceType": "number"
        },
        "bookValue": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverage": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "fiftyDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverage": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChange": {
          "yahooFinanceType": "number"
        },
        "twoHundredDayAverageChangePercent": {
          "yahooFinanceType": "number"
        },
        "marketCap": {
          "yahooFinanceType": "number"
        },
        "forwardPE": {
          "yahooFinanceType": "number"
        },
        "priceToBook": {
          "yahooFinanceType": "number"
        },
        "sourceInterval": {
          "yahooFinanceType": "number"
        },
        "exchangeDataDelayedBy": {
          "yahooFinanceType": "number"
        },
        "exchangeTimezoneName": {
          "type": "string"
        },
        "exchangeTimezoneShortName": {
          "type": "string"
        },
        "gmtOffSetMilliseconds": {
          "yahooFinanceType": "number"
        },
        "esgPopulated": {
          "type": "boolean"
        },
        "tradeable": {
          "type": "boolean"
        },
        "cryptoTradeable": {
          "type": "boolean"
        },
        "exchange": {
          "type": "string"
        },
        "fiftyTwoWeekLow": {
          "yahooFinanceType": "number"
        },
        "fiftyTwoWeekHigh": {
          "yahooFinanceType": "number"
        },
        "shortName": {
          "type": "string"
        },
        "averageAnalystRating": {
          "type": "string"
        },
        "regularMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "symbol": {
          "type": "string"
        },
        "dividendDate": {
          "yahooFinanceType": "number"
        },
        "displayName": {
          "type": "string"
        },
        "trailingPE": {
          "yahooFinanceType": "number"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "number"
        },
        "ipoExpectedDate": {
          "yahooFinanceType": "number"
        },
        "dividendYield": {
          "yahooFinanceType": "number"
        },
        "dividendRate": {
          "yahooFinanceType": "number"
        },
        "yieldTTM": {
          "yahooFinanceType": "number"
        },
        "peTTM": {
          "yahooFinanceType": "number"
        },
        "annualReturnNavY3": {
          "yahooFinanceType": "number"
        },
        "annualReturnNavY5": {
          "yahooFinanceType": "number"
        },
        "ytdReturn": {
          "yahooFinanceType": "number"
        },
        "trailingThreeMonthReturns": {
          "yahooFinanceType": "number"
        },
        "netAssets": {
          "yahooFinanceType": "number"
        },
        "netExpenseRatio": {
          "yahooFinanceType": "number"
        },
        "hasPrePostMarketData": {
          "type": "boolean"
        },
        "corporateActions": {
          "type": "array",
          "items": {}
        },
        "earningsCallTimestampStart": {
          "yahooFinanceType": "date"
        },
        "earningsCallTimestampEnd": {
          "yahooFinanceType": "date"
        },
        "isEarningsDateEstimate": {
          "type": "boolean"
        },
        "preMarketChange": {
          "yahooFinanceType": "number"
        },
        "preMarketChangePercent": {
          "yahooFinanceType": "number"
        },
        "preMarketTime": {
          "yahooFinanceType": "date"
        },
        "preMarketPrice": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "language",
        "region",
        "quoteType",
        "typeDisp",
        "triggerable",
        "customPriceAlertConfidence",
        "firstTradeDateMilliseconds",
        "priceHint",
        "regularMarketChange",
        "regularMarketTime",
        "regularMarketPrice",
        "currency",
        "regularMarketPreviousClose",
        "market",
        "messageBoardId",
        "fullExchangeName",
        "longName",
        "averageDailyVolume3Month",
        "averageDailyVolume10Day",
        "fiftyTwoWeekLowChange",
        "fiftyTwoWeekLowChangePercent",
        "fiftyTwoWeekRange",
        "fiftyTwoWeekHighChange",
        "fiftyTwoWeekHighChangePercent",
        "fiftyTwoWeekChangePercent",
        "marketState",
        "fiftyDayAverage",
        "fiftyDayAverageChange",
        "fiftyDayAverageChangePercent",
        "twoHundredDayAverage",
        "twoHundredDayAverageChange",
        "twoHundredDayAverageChangePercent",
        "sourceInterval",
        "exchangeDataDelayedBy",
        "exchangeTimezoneName",
        "exchangeTimezoneShortName",
        "gmtOffSetMilliseconds",
        "esgPopulated",
        "tradeable",
        "cryptoTradeable",
        "exchange",
        "fiftyTwoWeekLow",
        "fiftyTwoWeekHigh",
        "shortName",
        "regularMarketChangePercent",
        "symbol"
      ],
      "additionalProperties": false
    },
    "PredefinedScreenerModules": {
      "type": "string",
      "enum": [
        "aggressive_small_caps",
        "conservative_foreign_funds",
        "day_gainers",
        "day_losers",
        "growth_technology_stocks",
        "high_yield_bond",
        "most_actives",
        "most_shorted_stocks",
        "portfolio_anchors",
        "small_cap_gainers",
        "solid_large_growth_funds",
        "solid_midcap_growth_funds",
        "top_mutual_funds",
        "undervalued_growth_stocks",
        "undervalued_large_caps"
      ]
    },
    "ScreenerOptions": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "scrIds": {
          "$ref": "#/definitions/PredefinedScreenerModules"
        },
        "count": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "scrIds"
      ],
      "additionalProperties": false
    },
    "NamedParameters<typeof screener>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/ScreenerOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this"
      ],
      "additionalProperties": false
    },
    "SearchQuoteYahoo": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        }
      },
      "required": [
        "symbol",
        "isYahooFinance",
        "exchange",
        "index",
        "score"
      ],
      "additionalProperties": {}
    },
    "SearchQuoteYahooEquity": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "EQUITY"
        },
        "typeDisp": {
          "type": "string",
          "const": "Equity"
        },
        "sectorDisp": {
          "type": "string"
        },
        "industryDisp": {
          "type": "string"
        }
      },
      "required": [
        "exchange",
        "index",
        "industryDisp",
        "isYahooFinance",
        "quoteType",
        "score",
        "sectorDisp",
        "symbol",
        "typeDisp"
      ],
      "additionalProperties": {}
    },
    "SearchQuoteYahooOption": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "OPTION"
        },
        "typeDisp": {
          "type": "string",
          "const": "Option"
        }
      },
      "required": [
        "exchange",
        "index",
        "isYahooFinance",
        "quoteType",
        "score",
        "symbol",
        "typeDisp"
      ],
      "additionalProperties": {}
    },
    "SearchQuoteYahooETF": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "ETF"
        },
        "typeDisp": {
          "type": "string",
          "const": "ETF"
        }
      },
      "required": [
        "exchange",
        "index",
        "isYahooFinance",
        "quoteType",
        "score",
        "symbol",
        "typeDisp"
      ],
      "additionalProperties": {}
    },
    "SearchQuoteYahooFund": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "MUTUALFUND"
        },
        "typeDisp": {
          "type": "string",
          "const": "Fund"
        }
      },
      "required": [
        "exchange",
        "index",
        "isYahooFinance",
        "quoteType",
        "score",
        "symbol",
        "typeDisp"
      ],
      "additionalProperties": {}
    },
    "SearchQuoteYahooIndex": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "INDEX"
        },
        "typeDisp": {
          "type": "string",
          "const": "Index"
        }
      },
      "required": [
        "exchange",
        "index",
        "isYahooFinance",
        "quoteType",
        "score",
        "symbol",
        "typeDisp"
      ],
      "additionalProperties": {}
    },
    "SearchQuoteYahooCurrency": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "CURRENCY"
        },
        "typeDisp": {
          "type": "string",
          "const": "Currency"
        }
      },
      "required": [
        "exchange",
        "index",
        "isYahooFinance",
        "quoteType",
        "score",
        "symbol",
        "typeDisp"
      ],
      "additionalProperties": {}
    },
    "SearchQuoteYahooCryptocurrency": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "CRYPTOCURRENCY"
        },
        "typeDisp": {
          "type": "string",
          "const": "Cryptocurrency"
        }
      },
      "required": [
        "exchange",
        "index",
        "isYahooFinance",
        "quoteType",
        "score",
        "symbol",
        "typeDisp"
      ],
      "additionalProperties": {}
    },
    "SearchQuoteYahooFuture": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": true
        },
        "exchange": {
          "type": "string"
        },
        "exchDisp": {
          "type": "string"
        },
        "shortname": {
          "type": "string"
        },
        "longname": {
          "type": "string"
        },
        "index": {
          "type": "string",
          "const": "quotes"
        },
        "score": {
          "yahooFinanceType": "number"
        },
        "newListingDate": {
          "yahooFinanceType": "date"
        },
        "prevName": {
          "type": "string"
        },
        "nameChangeDate": {
          "yahooFinanceType": "date"
        },
        "sector": {
          "type": "string"
        },
        "industry": {
          "type": "string"
        },
        "dispSecIndFlag": {
          "type": "boolean"
        },
        "quoteType": {
          "type": "string",
          "const": "FUTURE"
        },
        "typeDisp": {
          "type": "string",
          "enum": [
            "Future",
            "Futures"
          ]
        }
      },
      "required": [
        "exchange",
        "index",
        "isYahooFinance",
        "quoteType",
        "score",
        "symbol",
        "typeDisp"
      ],
      "additionalProperties": {}
    },
    "SearchQuoteNonYahoo": {
      "type": "object",
      "properties": {
        "index": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "permalink": {
          "type": "string"
        },
        "isYahooFinance": {
          "type": "boolean",
          "const": false
        }
      },
      "required": [
        "index",
        "name",
        "permalink",
        "isYahooFinance"
      ],
      "additionalProperties": {}
    },
    "SearchNews": {
      "type": "object",
      "properties": {
        "uuid": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "publisher": {
          "type": "string"
        },
        "link": {
          "type": "string"
        },
        "providerPublishTime": {
          "yahooFinanceType": "date"
        },
        "type": {
          "type": "string"
        },
        "thumbnail": {
          "type": "object",
          "properties": {
            "resolutions": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/SearchNewsThumbnailResolution"
              }
            }
          },
          "required": [
            "resolutions"
          ],
          "additionalProperties": false
        },
        "relatedTickers": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "uuid",
        "title",
        "publisher",
        "link",
        "providerPublishTime",
        "type"
      ],
      "additionalProperties": {}
    },
    "SearchNewsThumbnailResolution": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        },
        "width": {
          "yahooFinanceType": "number"
        },
        "height": {
          "yahooFinanceType": "number"
        },
        "tag": {
          "type": "string"
        }
      },
      "required": [
        "url",
        "width",
        "height",
        "tag"
      ],
      "additionalProperties": false
    },
    "SearchResult": {
      "type": "object",
      "properties": {
        "explains": {
          "type": "array",
          "items": {}
        },
        "count": {
          "yahooFinanceType": "number"
        },
        "quotes": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "#/definitions/SearchQuoteYahooEquity"
              },
              {
                "$ref": "#/definitions/SearchQuoteYahooOption"
              },
              {
                "$ref": "#/definitions/SearchQuoteYahooETF"
              },
              {
                "$ref": "#/definitions/SearchQuoteYahooFund"
              },
              {
                "$ref": "#/definitions/SearchQuoteYahooIndex"
              },
              {
                "$ref": "#/definitions/SearchQuoteYahooCurrency"
              },
              {
                "$ref": "#/definitions/SearchQuoteYahooCryptocurrency"
              },
              {
                "$ref": "#/definitions/SearchQuoteNonYahoo"
              },
              {
                "$ref": "#/definitions/SearchQuoteYahooFuture"
              }
            ]
          }
        },
        "news": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/SearchNews"
          }
        },
        "nav": {
          "type": "array",
          "items": {}
        },
        "lists": {
          "type": "array",
          "items": {}
        },
        "researchReports": {
          "type": "array",
          "items": {}
        },
        "totalTime": {
          "yahooFinanceType": "number"
        },
        "screenerFieldResults": {
          "type": "array",
          "items": {}
        },
        "culturalAssets": {
          "type": "array",
          "items": {}
        },
        "timeTakenForQuotes": {
          "yahooFinanceType": "number"
        },
        "timeTakenForNews": {
          "yahooFinanceType": "number"
        },
        "timeTakenForAlgowatchlist": {
          "yahooFinanceType": "number"
        },
        "timeTakenForPredefinedScreener": {
          "yahooFinanceType": "number"
        },
        "timeTakenForCrunchbase": {
          "yahooFinanceType": "number"
        },
        "timeTakenForNav": {
          "yahooFinanceType": "number"
        },
        "timeTakenForResearchReports": {
          "yahooFinanceType": "number"
        },
        "timeTakenForScreenerField": {
          "yahooFinanceType": "number"
        },
        "timeTakenForCulturalAssets": {
          "yahooFinanceType": "number"
        },
        "timeTakenForSearchLists": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "explains",
        "count",
        "quotes",
        "news",
        "nav",
        "lists",
        "researchReports",
        "totalTime",
        "timeTakenForQuotes",
        "timeTakenForNews",
        "timeTakenForAlgowatchlist",
        "timeTakenForPredefinedScreener",
        "timeTakenForCrunchbase",
        "timeTakenForNav",
        "timeTakenForResearchReports",
        "timeTakenForScreenerField",
        "timeTakenForCulturalAssets",
        "timeTakenForSearchLists"
      ],
      "additionalProperties": {}
    },
    "SearchOptions": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string"
        },
        "region": {
          "type": "string"
        },
        "quotesCount": {
          "yahooFinanceType": "number"
        },
        "newsCount": {
          "yahooFinanceType": "number"
        },
        "enableFuzzyQuery": {
          "type": "boolean"
        },
        "quotesQueryId": {
          "type": "string"
        },
        "multiQuoteQueryId": {
          "type": "string"
        },
        "newsQueryId": {
          "type": "string"
        },
        "enableCb": {
          "type": "boolean"
        },
        "enableNavLinks": {
          "type": "boolean"
        },
        "enableEnhancedTrivialQuery": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    },
    "NamedParameters<typeof search>": {
      "type": "object",
      "properties": {
        "this": {
          "$ref": "#/definitions/ModuleThis"
        },
        "query": {
          "type": "string"
        },
        "queryOptionsOverrides": {
          "$ref": "#/definitions/SearchOptions"
        },
        "moduleOptions": {
          "$ref": "#/definitions/ModuleOptions"
        }
      },
      "required": [
        "this",
        "query"
      ],
      "additionalProperties": false
    },
    "TrendingSymbol": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string"
        }
      },
      "required": [
        "symbol"
      ],
      "additionalProperties": {}
    },
    "TrendingSymbolsResult": {
      "type": "object",
      "properties": {
        "count": {
          "yahooFinanceType": "number"
        },
        "quotes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TrendingSymbol"
          }
        },
        "jobTimestamp": {
          "yahooFinanceType": "number"
        },
        "startInterval": {
          "yahooFinanceType": "number"
        }
      },
      "required": [
        "count",
        "quotes",
        "jobTimestamp",
        "startInterval"
      ],
      "additionalProperties": {}
    }
  }
};

// node_modules/yahoo-finance2/esm/src/lib/validate/index.js
var definitions = schema_default.definitions;
var byType = {
  string(input, schema, errors2, instancePath, _dataCtx, schemaPath) {
    if (typeof input !== "string") {
      errors2.push({
        instancePath,
        schemaPath,
        message: "Expected a string",
        data: input
      });
      return false;
    }
    if (schema.enum && !schema.enum.includes(input)) {
      errors2.push({
        instancePath,
        schemaPath,
        message: "Invalid enum value",
        data: input,
        params: { enum: schema.enum }
      });
      return false;
    }
  },
  number(input, _schema, errors2, instancePath, _dataCtx, schemaPath) {
    if (typeof input !== "number") {
      errors2.push({
        instancePath,
        schemaPath,
        message: "Expected a number",
        data: input
      });
      return false;
    }
  },
  boolean(input, _schema, errors2, instancePath, _dataCtx, schemaPath) {
    if (typeof input !== "boolean") {
      errors2.push({
        instancePath,
        schemaPath,
        message: "Expected a boolean",
        data: input
      });
      return false;
    }
  },
  null(input, _schema, errors2, instancePath, _dataCtx, schemaPath) {
    if (input !== null) {
      errors2.push({
        instancePath,
        schemaPath,
        message: "Expected null",
        data: input
      });
      return false;
    }
  },
  undefined(input, schema, errors2, instancePath, _dataCtx, schemaPath) {
    if (input !== void 0) {
      errors2.push({
        instancePath,
        schemaPath,
        message: "Expected undefined",
        data: input,
        schema
      });
      return false;
    }
  },
  object(_input, schema, errors2, instancePath, _dataCtx, schemaPath) {
    if (typeof _input !== "object") {
      errors2.push({
        instancePath,
        schemaPath,
        message: "Expected an object",
        data: _input
      });
      return false;
    }
    const input = _input;
    const dataCtx = { parentData: input, parentDataProperty: "" };
    if (schema.required) {
      for (const key of schema.required) {
        if (!(key in input)) {
          errors2.push({
            instancePath,
            schemaPath: schemaPath + "/required",
            message: "Missing required property",
            data: key
          });
        }
      }
    }
    for (const [key, value] of Object.entries(input)) {
      const propSchema = schema.properties?.[key];
      dataCtx.parentDataProperty = key;
      if (propSchema) {
        validateAndCoerce(value, propSchema, errors2, instancePath + "/" + key, dataCtx, schemaPath);
      } else {
        if (schema.additionalProperties === false) {
          errors2.push({
            instancePath,
            schemaPath: schemaPath + "/additionalProperties",
            message: "should NOT have additional properties",
            params: {
              additionalProperty: key
            },
            data: input
          });
        } else if (schema.additionalProperties) {
          validateAndCoerce(value, schema.additionalProperties, errors2, instancePath + "/" + key, dataCtx, schemaPath + "/additionalProperties");
        }
      }
    }
  },
  array(input, schema, errors2, instancePath, _dataCtx, schemaPath) {
    if (!Array.isArray(input)) {
      errors2.push({ instancePath, message: "Expected an array", data: input });
      return false;
    }
    if (schema.items) {
      const dataCtx = { parentData: input, parentDataProperty: 0 };
      for (const [idx, value] of input.entries()) {
        dataCtx.parentDataProperty = idx;
        validateAndCoerce(value, schema.items, errors2, instancePath + "/" + idx, dataCtx, schemaPath + "/items");
      }
    }
  }
};
function set(dataCtx, value, instancePath) {
  if (dataCtx && dataCtx.parentData && dataCtx.parentDataProperty !== "") {
    dataCtx.parentData[dataCtx.parentDataProperty] = value;
  } else {
    throw new Error('In "' + instancePath + '", cannot set value ' + JSON.stringify(value) + " to context " + JSON.stringify(dataCtx));
  }
}
function yahooFinanceType(data, schema, errors2, instancePath, dataCtx, schemaPath = "") {
  if (schema === "number" || schema === "number|null") {
    if (typeof data === "number")
      return true;
    if (typeof data === "string") {
      const float = Number.parseFloat(data);
      if (Number.isNaN(float)) {
        errors2.push({
          instancePath,
          schemaPath,
          keyword: "yahooFinanceType",
          message: "Number.parseFloat returned NaN",
          params: { schema, data },
          data
        });
        return false;
      }
      return set(dataCtx, float, instancePath);
    }
    if (data === null) {
      if (schema === "number|null") {
        return true;
      } else {
        errors2.push({
          instancePath,
          schemaPath,
          keyword: "yahooFinanceType",
          message: "Expecting number'ish but got null",
          params: { schema, data }
        });
        return false;
      }
    }
    if (typeof data === "object") {
      if (Object.keys(data).length === 0) {
        if (schema === "number|null") {
          return set(dataCtx, null, instancePath);
        } else {
          errors2.push({
            instancePath,
            schemaPath,
            keyword: "yahooFinanceType",
            message: "Got {}->null for 'number', did you want 'number | null' ?",
            params: { schema, data }
          });
          return false;
        }
      }
      if ("raw" in data && typeof data.raw === "number") {
        return set(dataCtx, data.raw, instancePath);
      }
    }
    errors2.push({
      instancePath,
      schemaPath,
      keyword: "yahooFinanceType",
      message: "Expecting number'ish",
      params: { schema, data }
    });
    return false;
  } else if (schema === "date" || schema === "date|null") {
    if (data instanceof Date) {
      return true;
    }
    if (typeof data === "number") {
      return set(dataCtx, new Date(data * 1e3), instancePath);
    }
    if (data === null) {
      if (schema === "date|null") {
        return true;
      } else {
        errors2.push({
          instancePath,
          schemaPath,
          keyword: "yahooFinanceType",
          message: "Expecting date'ish but got null",
          params: { schema, data }
        });
        return false;
      }
    }
    if (typeof data === "object") {
      if (Object.keys(data).length === 0) {
        if (schema === "date|null") {
          return set(dataCtx, null, instancePath);
        } else {
          errors2.push({
            instancePath,
            schemaPath,
            keyword: "yahooFinanceType",
            message: "Got {}->null for 'date', did you want 'date | null' ?",
            params: { schema, data }
          });
          return false;
        }
      }
      if ("raw" in data && typeof data.raw === "number") {
        return set(dataCtx, new Date(data.raw * 1e3), instancePath);
      }
    }
    if (typeof data === "string") {
      if (data.match(/^\d{4,4}-\d{2,2}-\d{2,2}$/) || data.match(/^\d{4,4}-\d{2,2}-\d{2,2}T\d{2,2}:\d{2,2}:\d{2,2}(\.\d{3,3})?Z$/)) {
        return set(dataCtx, new Date(data), instancePath);
      }
    }
    errors2.push({
      instancePath,
      schemaPath,
      keyword: "yahooFinanceType",
      message: "Expecting date'ish",
      params: { schema, data }
    });
    return false;
  } else if (schema === "DateInMs") {
    if (typeof data === "number") {
      return set(dataCtx, new Date(data), instancePath);
    } else {
      errors2.push({
        // keyword: "yahooFinanceType",
        instancePath,
        schemaPath,
        message: "yahooFinanceDate/dateInMs: Expected a number",
        // params: { schema, data },
        schema,
        data
      });
      return false;
    }
  } else if (schema === "TwoNumberRange") {
    if (typeof data === "object" && data !== null && "low" in data && typeof data.low === "number" && "high" in data && typeof data.high === "number") {
      return true;
    }
    if (typeof data === "string") {
      const parts = data.split("-").map(parseFloat);
      if (Number.isNaN(parts[0]) || Number.isNaN(parts[1])) {
        errors2.push({
          // keyword: "yahooFinanceType",
          instancePath,
          schemaPath,
          message: "yahooFinanceType: Number.parseFloat returned NaN: [" + parts.join(",") + "]",
          // params: { schema, data },
          schema,
          data
        });
        return false;
      }
      return set(dataCtx, { low: parts[0], high: parts[1] }, instancePath);
    }
    errors2.push({
      // keyword: "yahooFinanceType",
      instancePath,
      schemaPath,
      message: "TwoNumberRange: Unexpected format",
      // params: { schema, data },
      schema,
      data
    });
    return false;
  } else {
    errors2.push({
      instancePath,
      schemaPath,
      // keyword: "yahooFinanceType",
      message: "yahooFinanceType: no matching type",
      // params: { schema, data },
      data,
      schema
    });
    return false;
  }
}
function schemaFromSchemaOrSchemaKey(schemaOrSchemaKey) {
  let schema;
  let path = "";
  if (typeof schemaOrSchemaKey === "string") {
    const definition = schemaOrSchemaKey.match(/^#\/definitions\/(.*)$/)?.[1];
    if (!definition) {
      throw new Error("No such schema with key: " + schemaOrSchemaKey);
    }
    schema = definitions[definition];
    path = schemaOrSchemaKey;
    if (!schema) {
      throw new Error(`No such schema with key: ${definition}`);
    }
  } else {
    schema = schemaOrSchemaKey;
    if (schema.$id)
      path = schema.$id;
  }
  while (schema.$ref) {
    schema = definitions[schema.$ref.replace("#/definitions/", "")];
    path = schema.$ref;
  }
  return [schema, path];
}
function validateAndCoerce(input, schemaOrSchemaKey, errors2 = [], instancePath = "", dataCtx, schemaPath = null) {
  const [schema, foundSchemaPath] = schemaFromSchemaOrSchemaKey(schemaOrSchemaKey);
  if (foundSchemaPath)
    schemaPath = foundSchemaPath;
  if (schema.anyOf) {
    const allErrors = [];
    let _errors = [];
    const serializedInput = JSON.stringify(input);
    let i = 0;
    for (const subSchema of schema.anyOf) {
      const subSchemaPath = subSchema.$ref || schemaPath + "/anyOf/" + (i++).toString();
      _errors = [];
      validateAndCoerce(input, subSchema, _errors, instancePath, dataCtx, subSchemaPath);
      if (!_errors.length)
        break;
      allErrors.push(..._errors);
      if (dataCtx?.parentData) {
        input = serializedInput === void 0 ? void 0 : JSON.parse(serializedInput);
        dataCtx.parentData[dataCtx.parentDataProperty] = input;
      }
    }
    if (_errors.length) {
      errors2.push({
        instancePath,
        schemaPath,
        // ! because of "if null" check above
        message: "should match some schema in anyOf",
        data: input,
        // schema,
        subErrors: allErrors
      });
      return false;
    }
  } else if (schema.yahooFinanceType) {
    yahooFinanceType(input, schema.yahooFinanceType, errors2, instancePath, dataCtx, schemaPath);
  } else {
    if (schema.type === void 0) {
    } else if (Array.isArray(schema.type)) {
      let _errors = [];
      for (const type of schema.type) {
        _errors = [];
        const validator = byType[type];
        if (!validator) {
          throw new Error(`No validator for type ${JSON.stringify(type)} in ${instancePath}`);
        }
        validator(input, schema, _errors, instancePath, dataCtx, schemaPath);
        if (!_errors.length)
          break;
      }
      if (_errors.length) {
        errors2.push({
          instancePath,
          message: `Expected one of ${schema.type.join(", ")}`,
          data: input
        });
        return false;
      }
    } else {
      const validator = byType[schema.type];
      if (!validator) {
        throw new Error(`No validator for type ${JSON.stringify(schema.type)} in ${instancePath}`);
      }
      validator(input, schema, errors2, instancePath, dataCtx, schemaPath);
    }
  }
  return errors2;
}

// node_modules/yahoo-finance2/esm/src/lib/validateAndCoerceTypes.js
var logObj = import_shim_deno2.Deno.stdout.isTerminal() ? (obj) => console.dir(obj, { depth: 4, colors: true }) : (obj) => console.log(JSON.stringify(obj, null, 2));
function aggregateErrors(inputErrors) {
  const missingMap = /* @__PURE__ */ new Map();
  const additionalMap = /* @__PURE__ */ new Map();
  const errors2 = inputErrors.filter((error) => {
    if (error.subErrors) {
      error.subErrors = aggregateErrors(error.subErrors);
    }
    if (error.schemaPath) {
      const key = error.schemaPath + "|" + error.instancePath;
      if (error.message === "Missing required property") {
        let arr;
        if (missingMap.has(key)) {
          arr = missingMap.get(key);
        } else {
          arr = [];
          missingMap.set(key, arr);
        }
        arr.push(error);
        return false;
      } else if (error.message === "should NOT have additional properties") {
        let arr;
        if (additionalMap.has(key)) {
          arr = additionalMap.get(key);
        } else {
          arr = [];
          additionalMap.set(key, arr);
        }
        arr.push(error);
        return false;
      }
    }
    return true;
  });
  for (const arr of missingMap.values()) {
    const missing = [];
    for (const error of arr) {
      missing.push(error.data || "somethingWentWrong(tm)");
    }
    errors2.push({
      schemaPath: arr[0].schemaPath,
      instancePath: arr[0].instancePath,
      message: "Missing required properties",
      params: { missing }
    });
  }
  for (const arr of additionalMap.values()) {
    const additionalProperties = {};
    for (const error of arr) {
      const additionalProperty = error.params?.additionalProperty || "somethingWentWrong(tm)";
      additionalProperties[additionalProperty] = error.data[additionalProperty];
    }
    errors2.push({
      schemaPath: arr[0].schemaPath,
      instancePath: arr[0].instancePath,
      message: "should NOT have additional properties",
      params: { additionalProperties }
    });
  }
  return errors2;
}
function validate({ source, type, object, schemaKey, options: options2 }) {
  const _errors = validateAndCoerce(object, schemaKey);
  if (_errors === false || !_errors.length)
    return;
  const errors2 = aggregateErrors(_errors);
  if (type === "result") {
    if (options2.logErrors === true) {
      const title = encodeURIComponent("Failed validation: " + schemaKey);
      console.log("The following result did not validate with schema: " + schemaKey);
      logObj(errors2);
      console.log(`
This may happen intermittently and you should catch errors appropriately.
However:  1) if this recently started happening on every request for a symbol
that used to work, Yahoo may have changed their API.  2) If this happens on
every request for a symbol you've never used before, but not for other
symbols, you've found an edge-case (OR, we may just be protecting you from
"bad" data sometimes stored for e.g. misspelt symbols on Yahoo's side).
Please see if anyone has reported this previously:

  ${repository}/issues?q=is%3Aissue+${title}

or open a new issue (and mention the symbol):  ${deno_default.name} v${deno_default.version}

  ${repository}/issues/new?labels=bug%2C+validation&template=validation.md&title=${title}

For information on how to turn off the above logging or skip these errors,
see https://github.com/gadicc/node-yahoo-finance2/tree/devel/docs/validation.md.

At the end of the doc, there's also a section on how to
[Help Fix Validation Errors](https://github.com/gadicc/node-yahoo-finance2/blob/devel/docs/validation.md#help-fix)
in case you'd like to contribute to the project.  Most of the time, these
fixes are very quick and easy; it's just hard for our small core team to keep up,
so help is always appreciated!
`);
    }
    throw new FailedYahooValidationError("Failed Yahoo Schema validation", {
      result: object,
      errors: errors2
    });
  } else {
    if (options2.logOptionsErrors === true) {
      console.error(`[yahooFinance.${source}] Invalid options ("${schemaKey}")`);
      logObj({ errors: errors2, input: object });
    }
    throw new InvalidOptionsError(`yahooFinance.${source} called with invalid options.`);
  }
}
var validateAndCoerceTypes_default = validate;

// node_modules/yahoo-finance2/esm/src/lib/csv2json.js
var DELIMITER = ",";
function camelize(str) {
  return str.split(" ").map((str2, i) => i === 0 ? str2.toLowerCase() : str2[0].toUpperCase() + str2.substr(1).toLowerCase()).join("");
}
function convert(input) {
  if (input.match(/\d{4,4}-\d{2,2}-\d{2,2}/))
    return new Date(input);
  if (input.match(/^[0-9\.]+$/))
    return parseFloat(input);
  if (input === "null")
    return null;
  return input;
}
function csv2json(csv) {
  const lines = csv.split("\n");
  const headers = lines.shift().split(DELIMITER).map(camelize);
  const out = new Array(lines.length);
  for (let i = 0; i < lines.length; i++) {
    const inRow = lines[i].split(DELIMITER);
    const outRow = out[i] = {};
    for (let j = 0; j < inRow.length; j++) {
      outRow[headers[j]] = convert(inRow[j]);
    }
  }
  return out;
}

// node_modules/yahoo-finance2/esm/src/lib/moduleExec.js
async function moduleExec(opts) {
  const queryOpts = opts.query;
  const moduleOpts = opts.moduleOptions;
  const moduleName = opts.moduleName;
  const resultOpts = opts.result;
  if (queryOpts.assertSymbol) {
    const symbol = queryOpts.assertSymbol;
    if (typeof symbol !== "string") {
      throw new Error(`yahooFinance.${moduleName}() expects a single string symbol as its query, not a(n) ${typeof symbol}: ${JSON.stringify(symbol)}`);
    }
  }
  validateAndCoerceTypes_default({
    source: moduleName,
    type: "options",
    object: queryOpts.overrides ?? {},
    schemaKey: queryOpts.schemaKey,
    options: this._opts.validation
  });
  let queryOptions = {
    ...queryOpts.defaults,
    // Module defaults e.g. { period: '1wk', lang: 'en' }
    ...queryOpts.runtime,
    // Runtime params e.g. { q: query }
    ...queryOpts.overrides
    // User supplied options that override above
  };
  if (queryOpts.transformWith) {
    queryOptions = queryOpts.transformWith(queryOptions);
  }
  let result = await this._fetch(queryOpts.url, queryOptions, moduleOpts, queryOpts.fetchType, queryOpts.needsCrumb);
  if (queryOpts.fetchType === "csv")
    result = csv2json(result);
  if (opts.result.transformWith)
    result = opts.result.transformWith(result);
  const validateResult = !moduleOpts || moduleOpts.validateResult === void 0 || moduleOpts.validateResult === true;
  const validationOpts = {
    ...this._opts.validation,
    // Set logErrors=false if validateResult=false
    logErrors: validateResult ? this._opts.validation.logErrors : false
  };
  try {
    validateAndCoerceTypes_default({
      source: moduleName,
      type: "result",
      object: result,
      schemaKey: resultOpts.schemaKey,
      options: validationOpts
    });
  } catch (error) {
    if (validateResult)
      throw error;
  }
  return result;
}
var moduleExec_default = moduleExec;

// node_modules/yahoo-finance2/esm/src/createYahooFinance.js
var YahooFinance = class {
  constructor(options2) {
    Object.defineProperty(this, "_opts", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_fetch", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_moduleExec", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_env", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this._opts = { ...options_default, ...options2 };
    this._fetch = yahooFinanceFetch_default;
    this._moduleExec = moduleExec_default;
    this._env = {
      URLSearchParams,
      fetch,
      async fetchDevel() {
        const { default: fetchCache2 } = await Promise.resolve().then(() => (init_fetchCache(), fetchCache_exports));
        function fetchDevel(input, init) {
          const { devel, ..._init } = init || {};
          if (typeof devel === "string") {
            fetchCache2._once({ id: devel.replace(/\.json$/, "") });
          } else {
            throw new Error("unexpected fetchDevel value: " + JSON.stringify(devel));
          }
          return fetch(input, init);
        }
        return fetchDevel;
      }
    };
  }
};
function createYahooFinance(createOpts) {
  Object.assign(YahooFinance.prototype, createOpts.modules);
  return YahooFinance;
}

// node_modules/yahoo-finance2/esm/src/modules/autoc.js
function autoc() {
  throw new Error("Yahoo decomissioned their autoc server sometime before 20 Nov 2021 (see https://github.com/gadicc/node-yahoo-finance2/issues/337])). Use `search` instead (just like they do).");
}

// node_modules/yahoo-finance2/esm/src/modules/quote.js
var queryOptionsDefaults = {};
async function quote(query, queryOptionsOverrides, moduleOptions) {
  const symbols = typeof query === "string" ? query : query.join(",");
  const returnAs = queryOptionsOverrides && queryOptionsOverrides.return;
  const results = await this._moduleExec({
    moduleName: "quote",
    query: {
      url: "https://${YF_QUERY_HOST}/v7/finance/quote",
      needsCrumb: true,
      schemaKey: "#/definitions/QuoteOptions",
      defaults: queryOptionsDefaults,
      runtime: { symbols },
      overrides: queryOptionsOverrides,
      transformWith(queryOptions) {
        if (queryOptions.fields)
          queryOptions.fields.join(",");
        delete queryOptions.return;
        return queryOptions;
      }
    },
    result: {
      schemaKey: "#/definitions/QuoteResponseArray",
      // deno-lint-ignore no-explicit-any
      transformWith(rawResult) {
        let results2 = rawResult?.quoteResponse?.result;
        if (!results2 || !Array.isArray(results2)) {
          throw new Error("Unexpected result: " + JSON.stringify(rawResult));
        }
        results2 = results2.filter((quote2) => quote2?.quoteType !== "NONE");
        return results2;
      }
    },
    moduleOptions
  });
  if (returnAs) {
    switch (returnAs) {
      case "array":
        return results;
      case "object": {
        const object = {};
        for (const result of results)
          object[result.symbol] = result;
        return object;
      }
      case "map": {
        const map = /* @__PURE__ */ new Map();
        for (const result of results)
          map.set(result.symbol, result);
        return map;
      }
    }
  } else {
    return typeof query === "string" ? results[0] : results;
  }
}

// node_modules/yahoo-finance2/esm/src/index.js
var modules = {
  quote,
  autoc
};
var YahooFinance2 = createYahooFinance({ modules });
var src_default = YahooFinance2;

// test6.ts
var yf = new src_default();
console.log("yf.quote:", typeof yf.quote);
/*! Bundled license information:

tough-cookie/dist/cookie/cookie.js:
  (*!
   * Copyright (c) 2015-2020, Salesforce.com, Inc.
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice,
   * this list of conditions and the following disclaimer.
   *
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   * this list of conditions and the following disclaimer in the documentation
   * and/or other materials provided with the distribution.
   *
   * 3. Neither the name of Salesforce.com nor the names of its contributors may
   * be used to endorse or promote products derived from this software without
   * specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
   * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
   * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
   * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
   * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
   * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
   * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
   * POSSIBILITY OF SUCH DAMAGE.
   *)
*/
