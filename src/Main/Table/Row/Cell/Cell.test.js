import Cell from './Cell';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';


it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<BrowserRouter>
			<table>
				<tbody>
					<tr><Cell/></tr>
				</tbody>
			</table>
		</BrowserRouter>,
		div
	)
	ReactDOM.unmountComponentAtNode(div)
})
