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

    buildHeader(columnName: Array<string>): void {
        const headerRow: HTMLTableRowElement = document.createElement('tr');
        const headerLabels: Array<string> = columnName;

        headerLabels.forEach((label: string) => {
            const th: HTMLTableCellElement = document.createElement('th');
            th.textContent = label;
            headerRow.appendChild(th);
        });

        this.thead.appendChild(headerRow);
    }

    addRow(data: Array<string | HTMLImageElement>): void {
        const row: HTMLTableRowElement = document.createElement('tr');

        data.forEach((cellData: string | HTMLImageElement) => {
            const cell: HTMLTableCellElement = document.createElement('td');
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
