const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Base schema for models with translation support
 * @param {Object} additionalFields - Additional fields specific to the model
 * @param {Object} options - Schema options
 * @returns {Schema} Mongoose schema
 */
function createTranslationSchema(additionalFields = {}, options = {}) {
    const baseFields = {
        defaultLanguage: {
            type: String,
            required: true,
            default: 'en-US'
        },
        translations: {
            type: Array,
            required: true,
            validate: {
                validator: function(translations) {
                    return translations && translations.length > 0;
                },
                message: 'At least one translation is required'
            }
        }
    };

    const schemaFields = { ...baseFields, ...additionalFields };
    
    const defaultOptions = {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    };

    return new Schema(schemaFields, { ...defaultOptions, ...options });
}

/**
 * Base schema for simple models without translation support
 * @param {Object} fields - Model fields
 * @param {Object} options - Schema options
 * @returns {Schema} Mongoose schema
 */
function createSimpleSchema(fields, options = {}) {
    const defaultOptions = {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    };

    return new Schema(fields, { ...defaultOptions, ...options });
}

/**
 * Add common methods to schema
 * @param {Schema} schema - Mongoose schema
 */
function addCommonMethods(schema) {
    // Instance method to get translation by locale
    schema.methods.getTranslation = function(locale = 'en-US') {
        if (!this.translations || this.translations.length === 0) {
            return null;
        }

        // Find translation for requested locale
        const translation = this.translations[0][locale];
        if (translation) {
            return translation;
        }

        // Fallback to default language
        return this.translations[0][this.defaultLanguage] || this.translations[0]['en-US'];
    };

    // Static method to find with locale
    schema.statics.findWithLocale = function(locale = 'en-US', filter = {}) {
        return this.find(filter).then(documents => {
            return documents.map(doc => ({
                ...doc.toObject(),
                translation: doc.getTranslation(locale)
            }));
        });
    };
}

module.exports = {
    createTranslationSchema,
    createSimpleSchema,
    addCommonMethods
};
