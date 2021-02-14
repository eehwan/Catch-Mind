import { getSocket } from "./sockets";
const aSocket = getSocket();

const _canvas = document.querySelector("canvas");
const _line_width = document.querySelector("#line_width");
const _colors = document.getElementsByClassName("color");
const _custom_color = document.querySelector("#custom_color");
const _mode = document.querySelector("#mode");

const ctx = _canvas.getContext('2d');

// 펜 설정 초기화
// ctx.strokeStyle = _custom_color.value;
// ctx.lineWidth = _line_width.value;
// 둘다 적용이 안되는데 아마

// 캔버스 크기 관련 (미설정시 해줄시 위치 오류남)
const _input_width = document.querySelector("#canvasWidth"),
      _input_height = document.querySelector("#canvasHeight");
_canvas.width = _input_width.value,
_canvas.height = _input_height.value;

// 색상관련

ctx.fillStyle = "#ffffff";
ctx.fillRect(0,0, _canvas.width, _canvas.height);
ctx.fillStyle = _custom_color.value; //흰색배경을 만들고 색상 초기화

// hex코드로 변환 (input::type=value 에는 hex값만 들어갈 수 있음)
const rgb2hex = rgb => {
  if (rgb.search("rgb") == -1) {
    return rgb;
  } else {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
}
export const handleColor = color => {
  _custom_color.value = rgb2hex(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// 그림그리기 관련
let painting = false;
let filling = false;
const start_paint = () => {
  painting = true;
}
const stop_paint = () => {
  painting = false;
  ctx.closePath();
}

const handle_mouseMove = e => {
  const _x = e.offsetX,
        _y = e.offsetY;
  draw(_x,_y);
}
export const beforePaint = (_x, _y) => {
  ctx.beginPath();
  ctx.moveTo(_x, _y);
};
export const beginPaint = (_x, _y) => {
  ctx.lineTo(_x, _y);
  ctx.stroke();
}
const draw = (x, y) => {
  if(!filling) {
    if (!painting) {
      beforePaint(x, y);
      aSocket.emit(window.events.beforePaint, {x, y});
    } else {
      beginPaint(x, y)
      aSocket.emit(window.events.beginPaint, {x, y});
    }
  }
}
export const handleFill = () => {
  ctx.fillRect(0,0, _canvas.width, _canvas.height);
  
  filling = false;
  _mode.value = 'draw';
};
const fill = () => {
  if(filling){
    handleFill();
    aSocket.emit(window.events.fill);
  }
};
export const handleClear = () => {
  ctx.clearRect(0, 0, _canvas.width, _canvas.height);
  filling = false;
  _mode.value= "draw";
};
// 버튼 관련
const handle_mode = () => {
  if (_mode.value == 'draw') {
    // _canvas.style.cursor=
    filling = false;
  }else if(_mode.value == 'fill') {
    // _canvas.style.cursor=
    filling = true;
  }else {
    handleClear();
    aSocket.emit(window.events.clear);
  }
}

const init = () => {
  // 선 굵기
  ctx.lineWidth=_line_width.value
  _line_width.addEventListener('input', () => ctx.lineWidth = _line_width.value);
  // 색상
  Array.from(_colors).forEach(x => x.addEventListener('click', e => {
    const color = e.target.style.backgroundColor;
    handleColor(color);
    aSocket.emit(window.events.changeColor, {color});
  }));
  _custom_color.addEventListener('input', e => {
    const color = e.target.value;
    handleColor(color);
    aSocket.emit(window.events.changeColor, {color});
  });
  // 그리기
  canvas.addEventListener("mousemove", handle_mouseMove);
  canvas.addEventListener("mousedown", start_paint);
  canvas.addEventListener("mouseup", stop_paint);
  canvas.addEventListener("click", fill);
  // 버튼
  _mode.addEventListener('change', handle_mode);
}
init();

aSocket.on(window.events.beforePaint, ({ x, y }) => beforePaint(x, y));
aSocket.on(window.events.beginPaint, ({ x, y }) => beginPaint(x, y));
aSocket.on(window.events.changeColor, ({ color }) => handleColor(color));
aSocket.on(window.events.fill, handleFill);
aSocket.on(window.events.clear, handleClear);