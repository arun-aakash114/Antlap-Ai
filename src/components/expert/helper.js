export const onlyNumbers = (e) => {
  if (e.type === "paste") {
    let clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData('Text');
    if (isNaN(pastedData)) {
      e.preventDefault();

    } else {
      return;
    }
  }
}

export function setBGColor(mode) {
  return mode === 'light' ? '#fcfcfb' : '#2b2b2b'
}

export function getCount(formData) {
  let count = 0;
  for (let i of formData.keys()) {
    console.log(i)
    count += 1;
  }
  return count;
}

export function setClassName(mode, icon) {
  return mode === icon ? 'resol_btn_active' : 'resol_btn'
}

export function getStep(step) {
  return step.length === 0 ? true : false
}


