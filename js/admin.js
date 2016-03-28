/**
 * Adapted from https://bitbucket.org/snippets/dachcom/KKLM7/yoastseojs-acf-fields
 * Credit: https://github.com/radugroza
 */

(function ($) {

    var BlockyYoastPlugin = function () {
        YoastSEO.app.registerPlugin('blockyYoastPlugin', {status: 'ready'});

        this.fetchData();
    };

    BlockyYoastPlugin.prototype.fetchData = function () {
        var _self = this,
            _postData = {};
        /* AJAX call to fetch your string content */
        return $.ajax({
            url: ajaxurl,
            type: 'post',
            dataType: 'json',
            data: _postData
        }).done(function (response) {
            _self.extra_content = response.content;
            YoastSEO.app.pluginReady('blockyYoastPlugin');

            /**
             * @param modification    {string}    The name of the filter
             * @param callable        {function}  The callable
             * @param pluginName      {string}    The plugin that is registering the modification.
             * @param priority        {number}    (optional) Used to specify the order in which the callables
             *                                    associated with a particular filter are called. Lower numbers
             *                                    correspond with earlier execution.
             */
            YoastSEO.app.registerModification('content', $.proxy(_self.getContent, _self), 'blockyYoastPlugin', 5);

        });
    };

    BlockyYoastPlugin.prototype.getContent = function (content) {
		$('.blocky_extra_content').each(function(){
			content += $(this).val();
		});
        $('iframe[id*=blocky]').each(function(){
            console.log($(this).html());
        })
        
        return content;
    };

    /**
     * YoastSEO content analysis integration
     */
    $(window).on('YoastSEO:ready', function () {
        new BlockyYoastPlugin();
    });
}) (jQuery);