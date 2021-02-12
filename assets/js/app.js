const _html = document.querySelector("html");
const _canvas = document.querySelector("canvas");
const _line_width = document.querySelector("#line_width");
const _colors = document.getElementsByClassName("color");
const _custom_color = document.querySelector("#custom_color");
const _mode = document.querySelector("#mode");
const _save = document.querySelector("#save");

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
function handle_color(color){
  _custom_color.value = rgb2hex(color); //input color value에는 hex값만 들어감
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
// hex코드로 변환
function rgb2hex(rgb) {
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

// 그림그리기 관련
let painting = false;
let filling = false;
function start_paint() {
  painting = true;
}
function stop_paint() {
  painting = false;
  ctx.closePath();
}

function handle_mouseMove(e) {
  const _x = e.offsetX,
        _y = e.offsetY;
  draw(_x,_y);
}
function draw(_x, _y){
  if(!filling) {
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(_x, _y);
    } else {
      console.log(_x, _y);
      ctx.lineTo(_x, _y);
      ctx.stroke();
    }
  }
}
function fill() {
  if(filling){
    ctx.fillRect(0,0, _canvas.width, _canvas.height);

    filling = false;
    _mode.value = 'draw';
  }
}

// 버튼 관련
function handle_mode(){
  if (_mode.value == 'draw'){
    // _canvas.style.cursor=
    filling = false;
  }else if(_mode.value == 'fill'){
    // _canvas.style.cursor=
    filling = true;
  }else{
    ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    _mode.value= "draw";
  }
}

function init(){
  // 선 굵기
  ctx.lineWidth=_line_width.value
  _line_width.addEventListener('input', () => ctx.lineWidth = _line_width.value);
  // 색상
  Array.from(_colors).forEach(x =>
    x.addEventListener('click', e =>
      handle_color(e.target.style.backgroundColor)
    )
  );
  _custom_color.addEventListener('input', e => handle_color(e.target.value));
  // 그리기
  _html.addEventListener("mousemove", handle_mouseMove);
  canvas.addEventListener("mousedown", start_paint);
  canvas.addEventListener("mouseup", stop_paint);
  canvas.addEventListener("click", fill);
  // 버튼
  _mode.addEventListener('change', handle_mode);
}
init();