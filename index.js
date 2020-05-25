const apply = (base) => {
    return (api, apiMiddlewares = []) => {
        let middlewares = [...base, ...apiMiddlewares];

        return async (req, res) => {

            let err = false;

            for (let i = 0; i < middlewares.length; i++) {
                const ware = middlewares[i];
                const data = await ware(req, res);


                if (data && data._status===false) {
                    res.json(data)
                    err = true
                    break;
                }

            }

            if (err) {
                return;
            }

            await api(req, res)

        }
    }

}

module.exports = apply;