'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

var _grayPercentage = require('gray-percentage')

var _grayPercentage2 = _interopRequireDefault(_grayPercentage)

var _typographyBreakpointConstants = require('typography-breakpoint-constants')

var _compassVerticalRhythm = require('compass-vertical-rhythm')

var _compassVerticalRhythm2 = _interopRequireDefault(_compassVerticalRhythm)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

var theme = {
  title: 'Twin Peaks',
  baseFontSize: '21px',
  baseLineHeight: 1.5,
  googleFonts: [
    {
      name: 'Rosario',
      styles: ['700'],
    },
    {
      name: 'Crimson Text',
      styles: ['400', '400i', '600'],
    },
  ],
  headerFontFamily: ['Rosario', 'sans-serif'],
  bodyFontFamily: ['Crimson Text', 'serif'],
  headerColor: 'hsla(0,0%,0%,0.9)',
  bodyColor: 'hsla(0,0%,0%,0.73)',
  headerWeight: '700',
  bodyWeight: 400,
  boldWeight: 600,
  overrideStyles: function overrideStyles(_ref, options) {
    var adjustFontSizeTo = _ref.adjustFontSizeTo,
      scale = _ref.scale,
      rhythm = _ref.rhythm

    const linkColor = '#0069ff'
    var vr = (0, _compassVerticalRhythm2.default)({
      baseFontSize: '19px',
      baseLineHeight: '29.85px',
    })
    return _defineProperty(
      {
        a: {
          color: linkColor,
          textDecoration: 'none',
          textShadow:
            '.03em 0 #fff,-.03em 0 #fff,0 .03em #fff,0 -.03em #fff,.06em 0 #fff,-.06em 0 #fff,.09em 0 #fff,-.09em 0 #fff,.12em 0 #fff,-.12em 0 #fff,.15em 0 #fff,-.15em 0 #fff', // eslint-disable-line
          backgroundImage:
            'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ' +
            linkColor +
            ' 1px, ' +
            linkColor +
            ' 2px, rgba(0, 0, 0, 0) 2px)',
        },
        'a:hover,a:active': {
          textShadow: 'none',
          backgroundImage: 'none',
        },
        'h1,h2,h3,h4,h5,h6': {
          marginTop: rhythm(1.5),
          marginBottom: rhythm(0.5),
        },
        'ul,ol': {
          marginLeft: rhythm(2 / 3),
        },
        // children ol, ul
        'li>ol,li>ul': {
          marginLeft: rhythm(2 / 3),
          marginBottom: 0,
        },
        // Blockquote styles.
        blockquote: _extends({}, scale(1 / 5), {
          borderLeft: rhythm(3 / 16) + ' solid ' + linkColor,
          color: (0, _grayPercentage2.default)(41),
          paddingLeft: rhythm(13 / 16),
          fontStyle: 'italic',
          marginLeft: 0,
          marginRight: 0,
        }),
        'blockquote > :last-child': {
          marginBottom: 0,
        },
        'blockquote cite': _extends(
          {},
          adjustFontSizeTo(options.baseFontSize),
          {
            color: options.bodyColor,
            fontStyle: 'normal',
            fontWeight: options.bodyWeight,
          }
        ),
        'blockquote cite:before': {
          content: '"— "',
        },
      },
      _typographyBreakpointConstants.MOBILE_MEDIA_QUERY,
      {
        html: _extends({}, vr.establishBaseline()),
        blockquote: {
          borderLeft: rhythm(3 / 16) + ' solid ' + linkColor,
          color: (0, _grayPercentage2.default)(41),
          paddingLeft: rhythm(9 / 16),
          fontStyle: 'italic',
          marginLeft: rhythm(-3 / 4),
          marginRight: 0,
        },
      }
    )
  },
}

exports.default = theme
