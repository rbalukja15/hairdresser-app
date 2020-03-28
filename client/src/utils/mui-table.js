export const customRowIndexColumn = () => {
    return ({
        name: '#',
        options: {
            filter: false,
            customBodyRender: (value, meta) => {
                return (
                    meta.rowIndex + 1
                );
            }
        }
    })
};