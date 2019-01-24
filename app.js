const range = document.querySelector('.range')

let val = 100
range.oninput = e => {
	val = e.target.value
	showVal(val)
}

const rangeVal = document.querySelector('.rangeVal')
const showVal = newVal => {
	rangeVal.innerHTML = newVal + ' ms'
}

const box = document.querySelector('.box')
box.addEventListener('click', async e => {
	performance.mark('start')
	let t0 = performance.now()

	let result = await stall(val)

	box.classList.toggle('changed')

	let t1 = performance.now()
	performance.mark('end')

	performance.measure('box', 'start', 'end')

	console.log('dt= ', t1 - t0, 'to generate', result)

	showResult(t1 - t0)
})

async function stall(stallTime) {
	await new Promise(resolve => setTimeout(resolve, stallTime))
}

const showResult = duration => {
	const node = document.createElement('LI')
	const textnode = document.createTextNode(duration.toFixed(2) + ' ms')
	node.appendChild(textnode)
	document.body.appendChild(node)
}
