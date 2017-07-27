/** Card object. */
function Card(t) {
  this.type = '';
  this.template = t;

  // Visual
  this._bgColor = 'rgba(0,0,0,0)';
  this._txtColor = 'rgba(255,255,255,1)';
  this._txtColor2 = 'rgba(255,255,255,1)';
  this._qrColor = '#000';
  this._qrBgColor = 'rgba(255,255,255,1)';

  this._logoFront = '';
  this._logoMiddle = '';
  this._logoBack = '';
  this._showMemo = true;
  this._showFront = true;
  this._showMiddle = true;
  this._showBack = true;


  // Common
  this._title = '';
  this._memo = '';

  // Mnemonic
  this._mnemonic = '';

  // Wallet
  this._address = '';
  this._amount = '';
  this._privateKey = '';
  this._showAmount = true;

  // Secret
  this._shareNumber = 0;
  this._sharesTotal = 0;
  this._showSharesTotal = false;
  this._shareValue = '';
  this._groupFirstThree = false;
  this._groupChars = 0;
  this._useHex = false;
  this._showTotal = true;

}
/** Card getters and setters. */
Object.defineProperties(Card.prototype, {
  'title': {
    get: function () {
      return this._title;
    },
    set: function (x) {
      this._title = x;
      this.template.find(".output-title").text(this.title);
    }
  },
  'bgColor': {
    get: function () {
      return this._bgColor;
    },
    set: function (x) {
      this._bgColor = x;
      var t = this.template;
      t.find(".card-face").css('background-color', x);
    }
  },
  'txtColor': {
    get: function () {
      return this._txtColor;
    },
    set: function (x) {
      this._txtColor = x;
      var t = this.template;
      t.find(".txt-color").css('color', this._txtColor);
    }
  },
  'txtColor2': {
    get: function () {
      return this._txtColor2;
    },
    set: function (x) {
      this._txtColor2 = x;
      var t = this.template;
      t.find(".txt-color2").css('color', this._txtColor2);
    }
  },
  'memo': {
    get: function () {
      return this._memo;
    },
    set: function (y) {
      this._memo = y;
      var t = this.template;
      t.find(".output-memo").text(this.memo);
    }
  },
  'shareNumber': {
    get: function () {
      return this._shareNumber;
    },
    set: function (y) {
      this._shareNumber = y;
      var t = this.template;
      t.find(".output-sharenumber").text(this._shareNumber);
    }
  },
  'amount': {
    get: function () {
      return this._amount;
    },
    set: function (x) {
      this._amount = x;
      var t = this.template;
      t.find(".output-amount").text(this._amount);
    }
  },
  'qrColor': {
    get: function () {
      return this._qrColor;
    },
    set: function (x) {
      this._qrColor = x;
      var t = this.template;
      var qropt = QR_OPT;
      qropt.fill = this._qrColor;
      qropt.text = this._privateKey;
      t.find(".qr-private").empty();
      t.find(".qr-private").qrcode(qropt);
    }
  },
  'qrBgColor': {
    get: function () {
      return this._qrBgColor;
    },
    set: function (x) {
      this._qrBgColor = x;
      var t = this.template;
      t.find(".qr").css("background-color", this._qrBgColor);
    }
  },
  'privateKey': {
    get: function () {
      return this._privateKey;
    },
    set: function (x) {
      this._privateKey = x;
      var t = this.template;
      var qropt = QR_OPT;
      qropt.fill = this._qrColor;
      qropt.text = this._privateKey;
      t.find(".qr-private").empty();
      t.find(".qr-private").qrcode(qropt);
      t.find(".output-privatekey").text(this._privateKey);
      var fontSize = 17;
      var ourText = t.find(".output-privatekey");
      var maxHeight = ourText.parent().width();
      var maxWidth = ourText.parent().height() - 8;
      var textHeight;
      var textWidth;
      do {
        ourText.css('font-size', fontSize);
        textHeight = ourText.height();
        textWidth = ourText.get()[0].scrollWidth;
        fontSize = fontSize - 0.5;
      } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
    }
  },
  'shareValue': {
    get: function () {
      return this._shareValue;
    },
    set: function (y) {
      this._shareValue = y;
      var t = this.template;
      if (this.groupFirstThree === true) {
        var first3 = y.substring(0, 3);
        var rest = y.substring(3);
        t.find(".output-sharevalue").html(first3 + "<br>" + reformat(rest, this.groupChars));
      } else {
        t.find(".output-sharevalue").text(reformat(this._shareValue, this.groupChars));
      }
      var qropt = QR_OPT;
      qropt.text = this._shareValue;
      t.find(".qr-share").empty();
      t.find(".qr-share").qrcode(qropt);
    }
  },
  'sharesTotal': {
    get: function () {
      return this._sharesTotal;
    },
    set: function (y) {
      this._sharesTotal = y;
      var t = this.template;
      t.find(".output-sharestotal").text(this._sharesTotal);
    }
  },
  'groupChars': {
    get: function () {
      return this._groupChars;
    },
    set: function (x) {
      this._groupChars = x;
      this.shareValue = this.shareValue;
    }
  },
  'groupFirstThree': {
    get: function () {
      return this._groupFirstThree;
    },
    set: function (x) {
      this._groupFirstThree = x;
      this.shareValue = this.shareValue;
    }
  },
  'showSharesTotal': {
    get: function () {
      return this._showSharesTotal;
    },
    set: function (x) {
      this._showSharesTotal = x;
    }
  },
  'showMemo': {
    get: function () {
      return this._showMemo;
    },
    set: function (x) {
      this._showMemo = x;
      if (this._showMemo === true) {
        this.template.find(".output-memo").show();
      } else {
        this.template.find(".output-memo").hide();
      }
    }
  },
  'useHex': {
    get: function () {
      return this._useHex;
    },
    set: function (x) {
      this._useHex = x;
      var t = this.template;
      if (this._useHex === true) {
        t.find(".output-sharenumber").text(this._shareNumber.toString(16));
        t.find(".output-sharestotal").text(this._sharesTotal.toString(16));
      } else {
        t.find(".output-sharenumber").text(this._shareNumber);
        t.find(".output-sharestotal").text(this._sharesTotal);
      }
    }
  },
  'showTotal': {
    get: function () {
      return this._showTotal;
    },
    set: function (x) {
      this._showTotal = x;
      if (this._showTotal === true) {
        this.template.find(".output-showTotal").show();
      } else {
        this.template.find(".output-showTotal").hide();
      }
    }
  },
  'showAmount': {
    get: function () {
      return this._showAmount;
    },
    set: function (x) {
      this._showAmount = x;
      if (this._showAmount === true) {
        this.template.find(".output-amount").show();
      } else {
        this.template.find(".output-amount").hide();
      }
    }
  },
  'showFront': {
    get: function () {
      return this._showFront;
    },
    set: function (x) {
      this._showFront = x;
      if (this._showFront === true) {
        this.template.find(".card-front").show();
      } else {
        this.template.find(".card-front").hide();
      }
    }
  },
  'showMiddle': {
    get: function () {
      return this._showMiddle;
    },
    set: function (x) {
      this._showMiddle = x;
      if (this._showMiddle === true) {
        this.template.find(".card-middle").show();
      } else {
        this.template.find(".card-middle").hide();
      }
    }
  },
  'showBack': {
    get: function () {
      return this._showBack;
    },
    set: function (x) {
      this._showBack = x;
      if (this._showBack === true) {
        this.template.find(".card-back").show();
      } else {
        this.template.find(".card-back").hide();
      }
    }
  },
  'mnemonic': {
    get: function () {
      return this._mnemonic;
    },
    set: function (y) {
      this._mnemonic = y;
      var t = this.template;
      var qropt = QR_OPT;
      qropt.text = this.mnemonic;
      t.find(".qr-seed").empty();
      t.find(".qr-seed").qrcode(qropt);
      t.find("#listMnem").empty();
      var mnemonics = this.mnemonic.split(" ");
      $.each(mnemonics, function (val) {
        t.find("#listMnem").append("<li>" + mnemonics[val] + "</li>");
      });
    }
  },
  'address': {
    get: function () {
      return this._address;
    },
    set: function (y) {
      this._address = y;
      var t = this.template;
      var qropt = QR_OPT;
      qropt.text = this._address;
      t.find(".qr-address").empty();
      t.find(".qr-address").qrcode(qropt);
      t.find(".output-address").text(this._address);
    }
  },
  'logoFront': {
    get: function () {
      return this._logoFront;
    },
    set: function (x) {
      this._logoFront = x;
      var t = this.template;
      t.find(".logo-l img").attr('src', 'images/' + this._logoFront + '-f.png');
      t.find(".logo-l img").show();
    }
  },
  'logoMiddle': {
    get: function () {
      return this._logoMiddle;
    },
    set: function (x) {
      this._logoMiddle = x;
      var t = this.template;
      t.find(".logo-r img").attr('src', 'images/' + this._logoMiddle + '-m.png');
      t.find(".logo-r img").show();
    }
  },
  'logoBack': {
    get: function () {
      return this._logoBack;
    },
    set: function (x) {
      this._logoBack = x;
      var t = this.template;
      t.find(".logo-p img").attr('src', 'images/' + this._logoBack + '-b.png');
      t.find(".logo-p img").show();
    }
  }
});

/** QR code options. */
var QR_OPT = {
  // render method: 'canvas', 'image' or 'div'
  render: 'image',
  // version range somewhere in 1 .. 40
  minVersion: 1,
  maxVersion: 40,
  // error correction level: 'L', 'M', 'Q' or 'H'
  ecLevel: 'H',
  // offset in pixel if drawn onto existing canvas
  left: 0,
  top: 0,
  // size in pixel
  size: 600,
  // code color or image element
  fill: '#000',
  // background color or image element, null for transparent background
  background: null,
  // content
  text: '',
  // corner radius relative to module width: 0.0 .. 0.5
  radius: 0,
  // quiet zone in modules
  quiet: 1,
  // modes
  // 0: normal
  // 1: label strip
  // 2: label box
  // 3: image strip
  // 4: image box
  mode: 0,
  mSize: 0.1,
  mPosX: 0.5,
  mPosY: 0.5,
  label: 'no label',
  fontname: 'sans',
  fontcolor: '#000',
  image: null
};
/** Presets. */
var DEFAULTS = {
  'btc': {
    coin: 'btc',
    bcgColor: 'rgba(255, 187, 106, 0.6)',
    symbol: '฿'
  },
  'zec': {
    coin: 'zec',
    bcgColor: 'rgba(61, 8, 11, 0.61)',
    symbol: 'ⓩ'
  },
  'dash': {
    coin: 'dash',
    bcgColor: 'rgba(189,231,255,0.69)',
    symbol: 'Đ'
  },
  'eth': {
    coin: 'eth',
    bcgColor: 'rgba(214, 160, 255, 0.61)',
    symbol: 'Ξ'
  },
  'doge': {
    coin: 'doge',
    bcgColor: 'rgba(255, 227, 104, 0.78)',
    symbol: 'Ð'
  },
  'etc': {
    coin: 'etc',
    bcgColor: 'rgba(255, 255, 255,1)',
    symbol: 'ξ'
  },
  'icn': {
    coin: 'icn',
    bcgColor: 'rgba(228, 242, 255, 0.81)',
    symbol: 'ICN'
  },
  'icn2': {
    coin: 'icn2',
    bcgColor: 'rgba(77, 110, 140, 1)',
    symbol: 'ICN'
  },
  'xlm': {
    coin: 'xlm',
    bcgColor: 'rgba(77, 110, 140, 1)',
    symbol: '*'
  },
  'xrp': {
    coin: 'xrp',
    bcgColor: 'rgba(197, 227, 255, 0.43)',
    symbol: 'Ʀ',
    txtColor: '#000',
    bgImage: ''
  },
  'xmy': {
    coin: 'xmy',
    bcgColor: 'rgba(197, 227, 255, 0.43)',
    symbol: 'XMY',
    txtColor: '#000',
    bgImage: ''
  },
  'ttc': {
    coin: 'ttc',
    bcgColor: 'rgba(255,239,182,0.6)',
    symbol: 'T'
  }
};

var MNEMONIC_DEFAULT = {

};

var changeAllCards = false;

/** Document ready bindings. */
$(document).ready(function () {

  /** Navigation tabs. */
  $('#myTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  $('#modalEdit').click(function (e) {
    if (event.target === this) {
      closeModal();
    }
  });

  $("#btnAddMnemonicCard").click(function () {
    var template = $("#mnemonics-card-template").clone();
    template.removeAttr("id");
    template.appendTo(".page");
    var card = new Card(template);
    card.type = 'mnemonic';
    card.title = "MNEMONIC";
    card.mnemonic = $("#txtMnem").val();
    card.memo = $("#txtNote").val();
    template.data('cardObj', card);
  });
  $("#btnAddWalletCard").click(function () {
    var template = $("#card-template").clone();
    template.removeAttr("id");
    template.appendTo(".page");
    var card = new Card(template);
    card.type = 'wallet';

    card.showFront = $('.showFront').prop('checked') == true;
    card.showMiddle = $('.showMiddle').prop('checked') == true;
    card.showBack = $('.showBack').prop('checked') == true;
    card.showMemo = $('.showMemo').prop('checked') == true;
    card.bgColor = DEFAULTS[$('.default-coin').val()].bcgColor;

    card.logoFront = DEFAULTS[$('.default-coin').val()].coin;
    card.logoMiddle = DEFAULTS[$('.default-coin').val()].coin;
    card.logoBack = DEFAULTS[$('.default-coin').val()].coin;

    card.title = "Wallet";
    card.amount = $('.default-amount').val() + ' ' + DEFAULTS[$('.default-coin').val()].symbol;
    card.mnemonic = $("#txtMnem").val();
    card.memo = $('.default-memo').val();
    template.data('cardObj', card);
  });

  $("#btnImport").click(function () {
    $(".page").empty();
    var lines = $("#txtImport").val().split("\n");
    var objs = [];
    $.each(lines, function (k) {
      if (lines[k].trim() != '') {
        var vals = lines[k].trim().split("\t");
        var obj = {
          note: vals[0],
          memo: $('.default-memo').val(),
          address: vals[1],
          private: vals[3],
          showFront: $('.showFront').prop('checked') == true,
          showMiddle: $('.showMiddle').prop('checked') == true,
          showBack: $('.showBack').prop('checked') == true,
          showMemo: $('.showMemo').prop('checked') == true,
          coin: DEFAULTS[$('.default-coin').val()].coin,
          amount: $('.default-amount').val() + ' ' + DEFAULTS[$('.default-coin').val()].symbol,
          bcgColor: DEFAULTS[$('.default-coin').val()].bcgColor};
        objs.push(obj);
      }
    });

    $.each(objs, function (k) {
      var template = $("#card-template").clone();
      template.removeAttr("id");
      template.appendTo(".page");

      var card = new Card(template);
      card.type = 'wallet';

      card.title = objs[k].note;
      card.memo = objs[k].memo;
      card.address = objs[k].address;
      card.privateKey = objs[k].private;
      card.showFront = objs[k].showFront;
      card.showMiddle = objs[k].showMiddle;
      card.showBack = objs[k].showBack;
      card.showMemo = objs[k].showMemo;
      card.amount = objs[k].amount;
      card.bgColor = objs[k].bcgColor;

      card.logoFront = DEFAULTS[$('.default-coin').val()].coin;
      card.logoMiddle = DEFAULTS[$('.default-coin').val()].coin;
      card.logoBack = DEFAULTS[$('.default-coin').val()].coin;


      template.data('cardObj', card);
    });
  });

  $("#btnShares").click(function () {
    $(".page").empty();
    var lines = $("#txtShares").val().split("\n");
    var objs = [];
    var i = 0;
    $.each(lines, function (k) {
      if (lines[k].trim()) {
        i++;
        var obj = {
          num: i,
          share: lines[k]
        };
        objs.push(obj);
      }
    });

    $.each(objs, function (k) {
      objs[k].total = objs.length;

      var template = $("#share-card-template").clone();
      template.removeAttr("id");
      template.appendTo(".page");
      var card = new Card(template);
      card.type = 'secret';
      template.data('cardObj', card);

      card.shareNumber = objs[k].num;

      card.sharesTotal = objs.length;
      card.shareValue = objs[k].share;
    });
  });

  /** Edit button onClick. */
  $(document).on('click', '.btnEdit', function (e) {
    loadModal($(this).closest('.card-container').data('cardObj'));
  });
  /** Edit on double click. */
  $(document).on('dblclick', '.card', function (e) {
    loadModal($(this).closest('.card-container').data('cardObj'));
  });
  /** Delete button onClick. */
  $(document).on('click', '.btnDel', function (e) {
    $(this).closest('.card-container').remove();
  });
  /** Color picker in modal edit dialog. */
  $('#modalEdit .cpicker').colorpicker({format: 'rgba'}).on('changeColor', function (e) {
    if (changeAllCards === true) {
      var cards = $(".page .card-container").map(function (v, i) {
        return $(i).data('cardObj');
      });
      var field = $(this).data('forfield');
      $.each(cards, function (index, card) {
        if (field === 'qrColor') {
          card[field] = e.color.toHex();
        } else {
          card[field] = e.color.toString('rgba');
        }
      });
    } else {
      var card = $('#modalEdit').data('card');
      if ($(this).data('forfield') === 'qrColor') {
        card[$(this).data('forfield')] = e.color.toHex();
      } else {
        card[$(this).data('forfield')] = e.color.toString('rgba');
      }
    }
  });
  /** Card edit input texts. */
  $('.card-input[type=text]').on('input', function (e) {
    if (changeAllCards === true) {
      var cards = $(".page .card-container").map(function (v, i) {
        return $(i).data('cardObj');
      });
      var field = $(this).data('forfield');
      $.each(cards, function (index, card) {
        card[field] = $(e.currentTarget).val();
      });
    } else {
      var card = $('#modalEdit').data('card');
      card[$(this).data('forfield')] = $(e.currentTarget).val();
    }
  });
  /** Card edit checkboxes. */
  $('.card-input[type=checkbox]').on('change', function (e) {
    if (changeAllCards === true) {
      var cards = $(".page .card-container").map(function (v, i) {
        return $(i).data('cardObj');
      });
      var field = $(this).data('forfield');
      $.each(cards, function (index, card) {
        card[field] = $(e.currentTarget).prop('checked') == true;
      });
    } else {
      var card = $('#modalEdit').data('card');
      card[$(this).data('forfield')] = $(e.currentTarget).prop('checked') == true;
    }
  });

  var template = $("#card-template").clone();
  template.removeAttr("id");
  template.appendTo(".page");
  $(".page").hide(0, function () {
    $(".page").show();
  });
  $(".page").empty();
}); // -- Document ready

function updateShareValue(v, t) {
  if ($('.first3special').prop('checked') == true) {
    var first3 = v.substring(0, 3);
    var rest = v.substring(3);
    t.find(".share-value").html(first3 + "<br>" + reformat(rest, $('.txtNumChars').val()));
  } else {
    t.find(".share-value").text(reformat(v, $('.txtNumChars').val()));
  }
  var qropt = QR_OPT;
  qropt.text = v;
  t.find(".qr-share").empty();
  t.find(".qr-share").qrcode(qropt);
}

function updateShareTemplate(o, t) {
  var num;
  var total;
  if ($('.useHex').prop('checked') == true) {
    num = o.num.toString(16);
    total = o.total.toString(16);
  } else {
    num = o.num;
    total = o.total;
  }

  if ($('.showTotal').prop('checked') == true) {
    t.find(".output-sharenumber").text(num);
    t.find(".output-sharestotal").text(total);
  } else {
    t.find(".sharenum-container").text(num);
  }
  if ($('.first3special').prop('checked') == true) {

    var first3 = o.share.substring(0, 3);
    var rest = o.share.substring(3);
    t.find(".share-value").html(first3 + "<br>" + reformat(rest, $('.txtNumChars').val()));

  } else {
    t.find(".share-value").text(reformat(o.share, $('.txtNumChars').val()));
  }
  var qropt = QR_OPT;
  qropt.text = o.share;
  t.find(".qr-share").empty();
  t.find(".qr-share").qrcode(qropt);
  t.find(".card-face").css('background-color', 'rgba(142, 0, 0, 0.64)');

}

function reformat(str, num) {
  if (num == 0) {
    num = -1;
  }
  var replace = "(.{" + num + "})";
  var re = new RegExp(replace, "g");
  var reformat = str.replace(re, function (match) {
    return match + " ";
  });
  return reformat;
}

function loadModal(c) {
  var modal = $('#modalEdit');
  modal.find('*[data-for]').hide();
  if (c.type === 'mnemonic') {
    modal.find("*[data-for*='m']").show();
  }
  if (c.type === 'wallet') {
    modal.find("*[data-for*='w']").show();
  }
  if (c.type === 'secret') {
    modal.find("*[data-for*='s']").show();
  }
  modal.data('card', c);
  modal.find('.card-input[data-forfield][type=text]').each(function (index) {
    $(this).val(c[$(this).data('forfield')]);
  });
  modal.find('.card-input[data-forfield][type=checkbox]').each(function (index) {
    $(this).prop('checked', c[$(this).data('forfield')]);
  });
  modal.find('.cpicker[data-forfield]').each(function (index) {
    $(this).colorpicker('setValue', c[$(this).data('forfield')]);
  });
  c.template.css('position', 'fixed');
  c.template.css('top', '20px');
  c.template.css('left', '20px');
  c.template.css('z-index', '999');
  c.template.find('.card-form').css('display', 'none');
  modal.show();
}

function closeModal() {
  var c = $('#modalEdit').data('card');
  c.template.removeAttr('style');
  c.template.find('.card-form').removeAttr('style');
  $('#modalEdit').hide();
}