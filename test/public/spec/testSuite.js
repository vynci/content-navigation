define( function () {
	'use strict';

	/* return an array of specs to be run */
	return {
		'specs' : [ 
			'spec/controllers/AppControllerTest',
			'spec/controllers/ProgramsControllerTest',
			'spec/models/SegmentModelTest',
			'spec/models/ProgramModelTest',
			'spec/collections/ProgramCollectionTest',
			'spec/collections/SegmentsCollectionTest',
			'spec/views/Programs/ProgramItemViewTest',
			'spec/views/Segments/SegmentItemViewTest',
			'spec/views/Programs/ProgramCollectionViewTest',
			'spec/views/Segments/SegmentsCollectionView',
			'spec/views/Filters/FilterLayoutTest',
			'spec/views/Filters/FilterCollectionTest',
			'spec/views/Filters/FilterItemTest',
			'spec/views/Grid/GridLayoutTest',
			'spec/views/HeaderLayoutTest',
			'spec/controllers/FiltersControllerTest',
			'spec/controllers/GridControllerTest',
			'spec/controllers/HeaderControllerTest'
		 ]
	};
} );
