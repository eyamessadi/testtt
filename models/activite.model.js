const mongoose = require ('mongoose');
Schema = mongoose.Schema;
;
const ActiviteSchema = new mongoose.Schema(
    { 
        activiterId: {
            type: String,
            required: true
          },
          nomactivite: {
            type: String,
            trim: true,
            maxlength: 500,
          },
          description: {
            type: String,
            trim: true,
            maxlength: 500,
          },
          
          datedebut: {
            type: Date
          },
          
          datefin:{
            type: Date
          },
          type: {
            type: String,
          },
          status: {
            type: String,
            default: "actif"
          },
         
         
          notes: {
              type : [{
                  noteurId: String,
                  noteurPseudo: String,
                  text: String, 
                  timestamp: Number,
                }
              ],
              required: true,
          },
          users: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
         
        },
        {
            timestamps:true,
        }
    );
    
    module.exports = mongoose.model('activite', ActiviteSchema);