export const makeUrl = (url: string, baseUrl = process.env.REACT_APP_PROXY) => {
	return [baseUrl?.trim().replace(/\/+$/, ''), url.trim().replace(/^\/+/, '')].join('/');
};

export const getData = async <T>(url: string, email: string, password: string): Promise<T> => {
	const res = await fetch(url, {
		method: 'Post',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	return await res.json();
};

export const updateFile = async <T>(data: FormData, url: string = 'upload-file'): Promise<T> => {
	return await fetch(makeUrl('///' + url), {
		method: 'Post',
		body: data,
	}).then((res) => res.json());
};

export const makeRequest = ({ url = '', headers = {}, body = null, method = 'get' }) => {
	return fetch(makeUrl(url), {
		method,
		headers,
		body,
	});
};
