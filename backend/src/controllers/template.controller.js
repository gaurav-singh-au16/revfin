const Template = require("../schema/template.schema")

const getTemplate = async (req, res) => {
    try {
        const template = await Template.findAll({})
        return res.status(200).json({ success: true, data: template })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = { getTemplate }