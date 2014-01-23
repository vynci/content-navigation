define( function () {
	'use strict';

	/* return an array of specs to be run */
	return {
		'specs' : [ 
			'spec/controllers/AppControllerTest',
			'spec/models/SegmentModelTest',
			'spec/models/ProgramModelTest',
			'spec/collections/ProgramCollectionTest',
			'spec/views/Programs/ProgramCollectionViewTest',
			'spec/views/Filters/FilterLayoutTest',
			'spec/views/Filters/FilterCollectionTest',
			'spec/views/Filters/FilterItemTest',
			'spec/views/Grid/GridLayoutTest',
			'spec/views/HeaderLayoutTest'
		 ]
	};
} );
