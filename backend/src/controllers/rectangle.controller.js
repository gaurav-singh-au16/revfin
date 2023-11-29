const Rectangle = require("../schema/rectangle.schema")

const getRectangle = async (req, res) => {

    try {
        // const template_id = req.params.template_id
        // console.log(template_id)
        const rect = await Rectangle.findAll(
            {
                attributes: ["id", "template_id", "height", "width", "xAxis", "yAxis", "stroke", "name"],
                // where: { template_id: template_id }
            }
        )
        return res.status(200).json({ success: true, data: rect })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
const getRectanglebyTemplate = async (req, res) => {

    try {
        const template_id = req.params.template_id
        // console.log(template_id)
        const rect = await Rectangle.findAll(
            {
                attributes: ["id", "template_id", "height", "width", "xAxis", "yAxis", "stroke", "name"],
                where: { template_id: template_id }
            }
        )
        return res.status(200).json({ success: true, data: rect })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const createUpdateRect = async (req, res) => {

    try {
        const reactData = req.body
        reactData.map(async (data) => {
            if(data.x == null){
                return
            }
            const rect = await Rectangle.findOne(
                {
                    where: { name: data.id }
                }
            )

            if (rect) {
                const updateRect = await Rectangle.update({
                    height: data.height,
                    width: data.width,
                    xAxis: data.xAxis,
                    yAxis: data.yAxis,
                }, { where: { name: data.id } })
                return res.status(200).json({ success: true })
            } else {
                const createRect = await Rectangle.create({
                    height: data.height,
                    width: data.width,
                    xAxis: data.x,
                    yAxis: data.y,
                    stroke: data.stroke,
                    name: data.id,
                    template_id: data.template_id
                })
            }
            return res.status(200).json({ success: true })
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = { getRectangle, createUpdateRect, getRectanglebyTemplate }