// أسعار المخالفات (بالدينار البحريني)
const violationPrices = {
    'fire_resistant_doors': 1000,
    'emergency_lights': 800,
    'smoke_detector': 1200,
    'smoke_exhaust_fan': 1500,
    'random_storage': 500,
    'security_cameras': 0, // تسجيل فقط
    'control_panel': 2000,
    'electrical_box': 1000,
    'firefighter_elevator': 0, // تسجيل فقط
    'elevator': 2500,
    'water_sprinkler_system': 3000,
    'gas_cylinders': 1500,
    'safety_instructions': 500,
    'fire_alarm_system': 2500,
    'electrical_wiring': 1800,
    'emergency_exits': 2000,
    'ventilation_system': 0, // تسجيل فقط
    'dry_wet_pipe_system': 3500,
    'water_hoses': 1200,
    'fire_extinguishers': 1000,
    'electrical_room': 2000,
    'pump_room': 2500,
    'first_aid_box': 500,
    'engineering_plans_changes': 5000, // مخالفة جديدة
    'other_violations': 1500 // مخالفة مخصصة
};

// دالة للحصول على سعر المخالفة
function getViolationPrice(violationId, isRecordOnly = false) {
    if (isRecordOnly) {
        return 0; // المخالفات التي تسجل فقط لا تحتاج دفع
    }
    return violationPrices[violationId] || 1000; // السعر الافتراضي 1000 دينار
}

// دالة لحساب المبلغ الإجمالي
function calculateTotalAmount(violations) {
    let total = 0;
    for (const violationId in violations) {
        const violation = violations[violationId];
        if (violation.options && violation.options.length > 0) {
            const hasPayableViolation = violation.options.some(opt => 
                opt.isViolation && !opt.recordOnly
            );
            if (hasPayableViolation) {
                total += getViolationPrice(violationId, false);
            }
        }
    }
    return total;
}

// تصدير للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { violationPrices, getViolationPrice, calculateTotalAmount };
}
