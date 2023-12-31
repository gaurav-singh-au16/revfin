const Rectangle = require("../schema/rectangle.schema")

const getRectangle = async (req, res) => {

    try {
        // const template_id = req.params.template_id
        // console.log(template_id)
        const rect = await Rectangle.findAll(
            {
                attributes: ["id", "template_id", "height", "width", "x", "y", "stroke", "name"],
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
                attributes: ["id", "template_id", "height", "width", "x", "y", "stroke", "name"],
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

function isUUID(str) {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidPattern.test(str);
  }

// const createUpdateRect = async (req, res) => {

//     try {
//         const reactData = req.body
//         console.log(reactData)
//         reactData.map(async (data) => {
          
//             const rect = await Rectangle.findOne(
//                 {
//                     where: isUUID(String(data.id))? { name: String(data.id) } : { id: data.id }
//                 }
//             )

//             if (rect) {
//                 const updateRect = await Rectangle.update({
//                     height: data.height,
//                     width: data.width,
//                     x: data.x,
//                     y: data.y,
//                 }, { where: rect?{id: data.id} : {name: String(data.id) } })
//                 // return res.status(200).json({ success: true })
//             } else {
//                 const createRect = await Rectangle.create({
//                     height: data.height,
//                     width: data.width,
//                     x: data.x,
//                     y: data.y,
//                     stroke: data.stroke,
//                     name: String(data.id),
//                     template_id: data.template_id
//                 })
//             }
//         })
//         return res.status(200).json({ success: true })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: error.message
//         })
//     }
// }
const createUpdateRect = async (req, res) => {
    try {
        const reactData = req.body;

        await Promise.all(reactData.map(async (data) => {
            let rect;

            if (isUUID(String(data.id))) {
                rect = await Rectangle.findOne({ where: { name: String(data.id) } });
            } else {
                rect = await Rectangle.findOne({ where: { id: data.id } });
            }

            if (rect) {
                await Rectangle.update({
                    height: data.height,
                    width: data.width,
                    x: data.x,
                    y: data.y,
                }, { where: { id: rect.id } });
            } else {
                await Rectangle.create({
                    height: data.height,
                    width: data.width,
                    x: data.x,
                    y: data.y,
                    stroke: data.stroke,
                    name: String(data.id),
                    template_id: data.template_id
                });
            }
        }));

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


const removeRectangle = async (req, res) => {

    try {
        const id = req.params.id
        const rect = await Rectangle.destroy(
            {
                where: { id: id }
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

module.exports = { getRectangle, createUpdateRect, getRectanglebyTemplate, removeRectangle }