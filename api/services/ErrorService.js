var Services = {
    Exceptions: require('./ExceptionService.js'),
    Instances: require('./InstanceService.js')
};

module.exports = {

    /**
     * If the error has been seen before, we'll add an instance. Otherwise
     * we'll add a new error.
     * @param data
     */
    add: function(data){
        var obj = this,
            create;
        // Have we seen this error before?
        return this.alreadyExists(data).then(function(exception){

            if(exception){
                data.error_id = exception._id;
                return obj.addNewInstance(data);
            } else {
                return obj.addNewException(data);
            }

        }).then(function(error){
            return error;
        });

    },

    alreadyExists: function(data){
        return Services.Exceptions.findByMessage(data.message);
    },

    addNewInstance: function(data){
        return Services.Instances.create(data);
    },

    addNewException: function(data){
        return Services.Exceptions.create(data);
    }
};