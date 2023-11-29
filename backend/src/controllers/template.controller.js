const Template = require("../schema/template.schema")
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


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
        upload.single('image')(req, res, async(err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).json({ success: false, error: 'Multer Error' });
            }
    
            // Continue with your file processing
            if (req.file) {
                const data = req.file.buffer;
                if (!data) {
                    return res.status(400).json({
                        success: false,
                        error: 'Image is required.',
                    });
                }
        
                const template = await Template.create({
                    image: data,
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
                
            } else {
                return res.status(400).json({ success: false, error: 'No file uploaded' });
            }
        })

    } catch (error) {
        console.error('Error adding template:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};


module.exports = { getTemplate, addTemplate }