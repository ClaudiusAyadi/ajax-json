const people = function () {
	const btn = document.querySelector('button');
	const output = document.querySelector('#output');
	const url = 'https://www.discoveryvip.com/shared/test1.json';

	const getJSON = async function (url) {
		try {
			const res = await fetch(url);
			if (!res.ok) throw new Error('Problem fetching data.');
			const data = await res.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	};

	btn.addEventListener('click', async function (e) {
		e.preventDefault();

		const data = await getJSON(url);

		renderData(data);
	});

	const renderData = function (data) {
		output.innerHTML = '';
		const html = String.raw;
		const template = html`
			<h2 class="text-2xl text-center mb-4">Received JSON Data</h2>
			<table
				class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead
					class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="px-6 py-3">Name</th>
						<th scope="col" class="px-6 py-3">Age</th>
						<th scope="col" class="px-6 py-3">Location</th>
					</tr>
				</thead>
				<tbody>
					${data
						.map(el => {
							const {name, age, location} = el;
							return html`
								<tr
									class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<td class="px-6 py-4">${name.first} ${name.last}</td>
									<td class="px-6 py-4">${age}</td>
									<td class="px-6 py-4">${location.country}</td>
								</tr>
							`;
						})
						.join('')}
				</tbody>
			</table>
		`;
		output.insertAdjacentHTML('afterbegin', template);
	};
};

export default people;
