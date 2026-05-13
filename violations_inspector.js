// بيانات المخالفات لتطبيق المفتشين
const inspectorViolations = [
    {
        id: 'fire_resistant_doors',
        name: 'أبواب مقاومة للحريق',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: true }
        ]
    },
    {
        id: 'emergency_lights',
        name: 'مصابيح طوارئ',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: true },
            { value: 'needs_maintenance', label: 'تحتاج صيانة', isViolation: true }
        ]
    },
    {
        id: 'smoke_detector',
        name: 'كاشف دخان',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: false },
            { value: 'needs_maintenance', label: 'يحتاج صيانة', isViolation: true }
        ]
    },
    {
        id: 'smoke_exhaust_fan',
        name: 'مروحة شفط الدخان',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: false },
            { value: 'needs_maintenance', label: 'بحاجة صيانة', isViolation: true }
        ]
    },
    {
        id: 'random_storage',
        name: 'التخزين العشوائي',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: true },
            { value: 'not_exists', label: 'لايوجد', isViolation: false }
        ]
    },
    {
        id: 'security_cameras',
        name: 'كاميرات أمنية',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: true, recordOnly: true },
            { value: 'not_working', label: 'لاتعمل', isViolation: true, recordOnly: true }
        ]
    },
    {
        id: 'control_panel',
        name: 'لوحة التحكم',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: true },
            { value: 'needs_maintenance', label: 'بحاجة صيانة', isViolation: true }
        ]
    },
    {
        id: 'electrical_box',
        name: 'صندوق الكهرباء',
        options: [
            { value: 'obstacles', label: 'وضع عوائق', isViolation: true },
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: false }
        ]
    },
    {
        id: 'firefighter_elevator',
        name: 'مصعد رجل الإطفاء',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: false, recordOnly: true }
        ]
    },
    {
        id: 'elevator',
        name: 'مصعد',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: false },
            { value: 'needs_maintenance', label: 'بحاجة صيانة', isViolation: true }
        ]
    },
    {
        id: 'water_sprinkler_system',
        name: 'نظام مرشات المياة',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: false },
            { value: 'needs_maintenance', label: 'بحاجة صيانة', isViolation: true }
        ]
    },
    {
        id: 'gas_cylinders',
        name: 'اسطوانات الغاز',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: false },
            { value: 'improper_placement', label: 'عدم الوضع في المكان الصحيح', isViolation: true }
        ]
    },
    {
        id: 'safety_instructions',
        name: 'إرشادات السلامة',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: true }
        ]
    },
    {
        id: 'fire_alarm_system',
        name: 'أنظمة إنذار الحريق',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: true },
            { value: 'needs_maintenance', label: 'بحاجة صيانة', isViolation: true }
        ]
    },
    {
        id: 'electrical_wiring',
        name: 'التمديدات الكهربائية',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: false },
            { value: 'improper_installation', label: 'عدم التمديد بشكل الصحيح', isViolation: true }
        ]
    },
    {
        id: 'emergency_exits',
        name: 'مخارج الطوارئ',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: true },
            { value: 'blocked', label: 'مغلقة', isViolation: true }
        ]
    },
    {
        id: 'ventilation_system',
        name: 'نظام التهوية',
        options: [
            { value: 'natural', label: 'طبيعية', isViolation: false, recordOnly: true },
            { value: 'mechanical', label: 'ميكانيكية', isViolation: false, recordOnly: true },
            { value: 'not_exists', label: 'لايوجد', isViolation: true }
        ]
    },
    {
        id: 'dry_wet_pipe_system',
        name: 'نظام الأنبوب الجاف / الرطب',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false, recordOnly: true },
            { value: 'not_exists', label: 'لايوجد', isViolation: false, recordOnly: true },
            { value: 'not_working', label: 'لاتعمل', isViolation: true }
        ]
    },
    {
        id: 'water_hoses',
        name: 'خراطيم المياة',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: false },
            { value: 'not_working', label: 'لاتعمل', isViolation: true },
            { value: 'needs_maintenance', label: 'بحاجة صيانة', isViolation: true }
        ]
    },
    {
        id: 'fire_extinguishers',
        name: 'طفايات الحريق',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: true },
            { value: 'not_working', label: 'لاتعمل', isViolation: true },
            { value: 'needs_maintenance', label: 'بحاجة صيانة', isViolation: true }
        ]
    },
    {
        id: 'electrical_room',
        name: 'غرفة الكهرباء',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لاتوجد', isViolation: false },
            { value: 'storage', label: 'تخزين', isViolation: true },
            { value: 'no_extinguisher', label: 'عدم توفر طفاية', isViolation: true },
            { value: 'no_ventilation', label: 'عدم توفر تهوية', isViolation: true },
            { value: 'non_fire_resistant_doors', label: 'أبواب غير مقاومة للحريق', isViolation: true },
            { value: 'water_leak', label: 'وجود تسرب ماء', isViolation: true }
        ]
    },
    {
        id: 'pump_room',
        name: 'غرفه المضخة',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: false },
            { value: 'needs_maintenance', label: 'بحاجة صيانة', isViolation: true },
            { value: 'random_storage', label: 'تخزين عشوائي', isViolation: true },
            { value: 'leak_or_break', label: 'وجود تسريب او كسر', isViolation: true }
        ]
    },
    {
        id: 'first_aid_box',
        name: 'صندوق إسعافات أولية',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: false },
            { value: 'not_exists', label: 'لايوجد', isViolation: true }
        ]
    },
    {
        id: 'engineering_plans_changes',
        name: 'التغيير على الخرائط الهندسية',
        options: [
            { value: 'exists', label: 'يوجد', isViolation: true },
            { value: 'not_exists', label: 'لايوجد', isViolation: false }
        ]
    },
    {
        id: 'other_violations',
        name: 'مخالفات أخرى',
        options: [
            { value: 'custom', label: 'مخالفة مخصصة', isViolation: true, requiresText: true }
        ]
    }
];

// دالة للتحقق من نوع المخالفة
function getViolationType(violation, selectedOptions) {
    const hasViolation = selectedOptions.some(option => {
        const opt = violation.options.find(o => o.value === option);
        return opt && opt.isViolation;
    });
    
    if (!hasViolation) {
        return 'no_violation';
    }
    
    const hasRecordOnly = selectedOptions.some(option => {
        const opt = violation.options.find(o => o.value === option);
        return opt && opt.recordOnly;
    });
    
    return hasRecordOnly ? 'record_only' : 'payable';
}

// تصدير للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { inspectorViolations, getViolationType };
}
