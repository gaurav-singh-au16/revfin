const Template = require("../schema/template.schema")

const getTemplate = async (req, res) => {
    try {
        const template = await Template.findAll({
            attributes: ["id", "image"]
        })
        return res.status(200).json({ success: true, data: template })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const addTemplate = async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({
                success: false,
                error: 'Image is required.',
            });
        }

        const template = await Template.create({
            image: image,
        });

        return res.status(201).json({
            success: true,
            message: 'Template created successfully.',
            template: {
                id: template.id,
                image: template.image,
                createdAt: template.createdAt,
                updatedAt: template.updatedAt,
            },
        });
    } catch (error) {
        console.error('Error adding template:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};


module.exports = { getTemplate, addTemplate }