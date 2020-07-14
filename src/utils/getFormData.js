export const getFormData = (submittedData) => {
    let fd = new FormData();

    for (var dataKey in submittedData) {
        let data = submittedData[dataKey];
        switch (dataKey) {
            default:
                fd.append(dataKey, data ? data : '');
        }
    }

    return fd;
}