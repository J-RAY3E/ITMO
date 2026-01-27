let currentR = 0;

const form = document.getElementById("form");
const rInput = document.getElementById('r_input');
const yInput = document.getElementById('y_input');
const xHiddenInput = document.getElementById('x_hidden_input');
const svg = document.getElementById("miSVG");
const coordPloter = document.getElementById("coordsPloter");

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-size: 14px;
        max-width: 300px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations for toast
if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function formatForDisplay(str, maxDecimals = 7) {
    if (typeof str !== 'string') str = String(str);
    str = str.trim();
    if (!str) return str;
    const num = Number(str.replace(',', '.'));
    if (isNaN(num) || !isFinite(num)) {
        return str;
    }
    if (Math.abs(num) >= 1e6 || Math.abs(num) < 1e-4) {
        return num.toExponential(maxDecimals - 1).replace('+', '');
    }
    return num.toFixed(maxDecimals).replace(/\.?0+$/, '');
}

function showError(fieldName, message) {
    if (fieldName === "general") {
        showToast(message, 'error');
        return;
    }
    const el = document.getElementById(`${fieldName}-error`);
    const input = document.getElementById(`${fieldName}_input`) || document.querySelector(`[name="${fieldName}"]`);
    if (el) el.textContent = message;
    if (input) input.classList.add('error');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('input, select').forEach(el => el.classList.remove('error'));
}

function clearHistory() {
    const pointsGroup = document.getElementById("pointsGroup");
    if (pointsGroup) {
        pointsGroup.innerHTML = '';
    }

    const clearForm = document.createElement('form');
    clearForm.method = 'POST';
    clearForm.action = 'controllerS';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'clear_history';
    input.value = 'true';
    clearForm.appendChild(input);

    document.body.appendChild(clearForm);
    clearForm.submit();
}

function validateAndFormat(data) {
    const validX = new Set(["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"]);
    clearErrors();

    let xValue = data.x;
    if (!xValue) {
        showError("x", "X must be selected.");
        return null;
    }

    const xNum = parseFloat(xValue);
    if (isNaN(xNum)) {
        showError("x", "X must be a valid number.");
        return null;
    }

    if (!validX.has(xValue.toString())) {
        if (xNum < -5 || xNum > 3) {
            showError("x", "X must be in range [-5, 3].");
            return null;
        }
    }

    const yStr = (data.y || "").trim().replace(',', '.');
    const yNum = parseFloat(yStr);

    if (yStr === "" || isNaN(yNum) || yNum < -3 || yNum > 3) {
        showError("y", "Y must be a number in [-3, 3].");
        return null;
    }

    const rStr = (data.rad || "").trim().replace(',', '.');
    const rNum = parseFloat(rStr);

    if (rStr === "" || isNaN(rNum) || rNum < 1 || rNum > 5) {
        showError("rad", "R must be selected (1-5).");
        return null;
    }

    return { x: xNum.toString(), y: yNum.toString(), rad: rNum.toString() };
}

function updateArea(r) {
    const areaGroup = document.getElementById("areaGroup");
    if (!areaGroup) return;

    const s = 30;
    const rNum = parseFloat(r);

    if (isNaN(rNum) || rNum < 1 || rNum > 5) {
        areaGroup.innerHTML = "";
        return;
    }

    const radius = rNum * s;
    const arc = `<path d="M 0 0 L ${radius} 0 A ${radius} ${radius} 0 0 0 0 ${-radius} Z" fill="#3b82f6" fill-opacity="0.5" stroke="#3b82f6"/>`;

    const halfRadius = radius / 2;
    const tri = `<polygon points="0,0 ${-halfRadius},0 0,${-radius}" fill="#3b82f6" fill-opacity="0.5" stroke="#3b82f6"/>`;

    const rect = `<rect x="${-radius}" y="0" width="${radius}" height="${halfRadius}" fill="#3b82f6" fill-opacity="0.5" stroke="#3b82f6"/>`;

    areaGroup.innerHTML = arc + tri + rect;
}

function updateRLabels(r) {
    // No longer needed since we use a legend instead of scattered labels
}

function updateGridLines(r) {
    const rGridLines = document.getElementById('rGridLines');
    if (!rGridLines) return;

    const rNum = parseFloat(r);
    if (isNaN(rNum) || rNum < 1 || rNum > 5) {
        rGridLines.innerHTML = '';
        return;
    }

    const s = 30;
    const rScaled = rNum * s;
    const r2Scaled = rScaled / 2;

    // Draw R grid lines
    rGridLines.innerHTML = `
        <!-- R grid lines -->
        <line x1="-210" y1="${rScaled}" x2="210" y2="${rScaled}" stroke="#a060f0" stroke-dasharray="2,2" stroke-width="0.5" />
        <line x1="-210" y1="${-rScaled}" x2="210" y2="${-rScaled}" stroke="#a060f0" stroke-dasharray="2,2" stroke-width="0.5" />
        <line x1="${rScaled}" y1="-210" x2="${rScaled}" y2="210" stroke="#a060f0" stroke-dasharray="2,2" stroke-width="0.5" />
        <line x1="${-rScaled}" y1="-210" x2="${-rScaled}" y2="210" stroke="#a060f0" stroke-dasharray="2,2" stroke-width="0.5" />
        
        <!-- R/2 grid lines -->
        <line x1="-210" y1="${r2Scaled}" x2="210" y2="${r2Scaled}" stroke="#ff6b9d" stroke-dasharray="2,2" stroke-width="0.5" />
        <line x1="-210" y1="${-r2Scaled}" x2="210" y2="${-r2Scaled}" stroke="#ff6b9d" stroke-dasharray="2,2" stroke-width="0.5" />
        <line x1="${r2Scaled}" y1="-210" x2="${r2Scaled}" y2="210" stroke="#ff6b9d" stroke-dasharray="2,2" stroke-width="0.5" />
        <line x1="${-r2Scaled}" y1="-210" x2="${-r2Scaled}" y2="210" stroke="#ff6b9d" stroke-dasharray="2,2" stroke-width="0.5" />
    `;
}

function selectX(btn) {
    document.querySelectorAll('.x-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    xHiddenInput.value = btn.dataset.value;
}

// Event listeners
rInput.addEventListener('change', function () {
    currentR = parseFloat(this.value) || 0;
    updateArea(currentR);
    updateRLabels(currentR);
    updateGridLines(currentR);
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        x: formData.get('x'),
        y: formData.get('y'),
        rad: formData.get('rad')
    };

    const validated = validateAndFormat(data);
    if (!validated) return;

    // Update form inputs with validated values (ensures dots are sent instead of commas)
    if (xHiddenInput) xHiddenInput.value = validated.x;
    if (yInput) yInput.value = validated.y;
    if (rInput) rInput.value = validated.rad;

    this.submit();
});

svg.addEventListener('mousemove', function (e) {
    const svgRect = svg.getBoundingClientRect();

    // Updated for -7 to 7 range: total coordinate range is 14, viewBox width is 420
    const svgX = ((e.clientX - svgRect.left - svgRect.width / 2) * 14 / svgRect.width).toFixed(2);
    const svgY = (-(e.clientY - svgRect.top - svgRect.height / 2) * 14 / svgRect.height).toFixed(2);

    coordPloter.textContent = `X: ${svgX}, Y: ${svgY}`;
    coordPloter.style.display = 'block';

    const tooltipX = e.clientX + 15;
    const tooltipY = e.clientY + 15;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const tooltipWidth = coordPloter.offsetWidth || 100;
    const tooltipHeight = coordPloter.offsetHeight || 20;

    let finalX = tooltipX;
    let finalY = tooltipY;


    if (tooltipX + tooltipWidth > windowWidth) {
        finalX = tooltipX - tooltipWidth - 20;
    }


    if (tooltipY + tooltipHeight > windowHeight) {
        finalY = tooltipY - tooltipHeight - 20;
    }

    coordPloter.style.left = `${finalX}px`;
    coordPloter.style.top = `${finalY}px`;
});

svg.addEventListener('mouseleave', function () {
    coordPloter.style.display = 'none';
});

svg.addEventListener('click', function (e) {
    if (!currentR || currentR < 1 || currentR > 5) {
        showToast('Please select R first (1-5)', 'error');
        return;
    }

    const rect = svg.getBoundingClientRect();
    // Updated for -7 to 7 range: total coordinate range is 14, viewBox width is 420
    const x = ((e.clientX - rect.left - rect.width / 2) * 14 / rect.width).toFixed(2);
    const y = (-(e.clientY - rect.top - rect.height / 2) * 14 / rect.height).toFixed(2);

    xHiddenInput.value = x;
    yInput.value = y;
    rInput.value = currentR;
    let fromGraphInput = document.getElementById('from_graph_input');
    if (!fromGraphInput) {
        fromGraphInput = document.createElement('input');
        fromGraphInput.type = 'hidden';
        fromGraphInput.id = 'from_graph_input';
        fromGraphInput.name = 'from_graph';
        form.appendChild(fromGraphInput);
    }
    fromGraphInput.value = 'true';


    form.submit();
});

// Initialize from server history
document.addEventListener('DOMContentLoaded', function () {
    // Clear form when navigating back from result page
    if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
        form.reset();
        xHiddenInput.value = '';
        document.querySelectorAll('.x-btn').forEach(btn => btn.classList.remove('selected'));
        currentR = 0;
        document.getElementById('areaGroup').innerHTML = '';
        document.getElementById('rGridLines').innerHTML = '';
    }

    if (window.serverHistory && Array.isArray(window.serverHistory)) {
        const pointsGroup = document.getElementById("pointsGroup");
        if (pointsGroup) {
            window.serverHistory.forEach(point => {
                const s = 30;
                const cx = parseFloat(point.x) * s;
                const cy = -parseFloat(point.y) * s;
                const color = point.hit ? "#10b981" : "#ef4444";

                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", cx);
                circle.setAttribute("cy", cy);
                circle.setAttribute("r", 4);
                circle.setAttribute("fill", color);
                circle.setAttribute("stroke", "#fff");
                circle.setAttribute("stroke-width", "1");
                pointsGroup.appendChild(circle);
            });
        }
    }
});