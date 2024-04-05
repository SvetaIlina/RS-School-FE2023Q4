export default class TableBuilder {
    private table: HTMLTableElement;

    private thead: HTMLTableSectionElement;

    private tbody: HTMLTableSectionElement;

    constructor(columnName: Array<string>) {
        this.table = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);

        this.buildHeader(columnName);
    }

    buildHeader(columnName: Array<string>) {
        const headerRow = document.createElement('tr');
        const headerLabels = columnName;

        headerLabels.forEach((label: string) => {
            const th = document.createElement('th');
            th.textContent = label;
            headerRow.appendChild(th);
        });

        this.thead.appendChild(headerRow);
    }

    addRow(data: Array<string | HTMLImageElement>) {
        const row = document.createElement('tr');

        data.forEach((cellData) => {
            const cell = document.createElement('td');
            if (typeof cellData === 'string') {
                cell.textContent = cellData;
            } else {
                cell.appendChild(cellData);
            }
            row.appendChild(cell);
        });

        this.tbody.appendChild(row);
    }

    getTable(): HTMLTableElement {
        return this.table;
    }
}
