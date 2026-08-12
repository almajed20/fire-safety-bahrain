// ملف مشترك للمزامنة بين تطبيق المفتشين والموقع الرئيسي

// دالة لمزامنة البيانات من تطبيق المفتشين إلى الموقع الرئيسي
function syncInspectionData() {
    try {
        // قراءة بيانات الفحوصات من تطبيق المفتشين
        const inspections = JSON.parse(localStorage.getItem('inspections') || '[]');
        
        // قراءة البيانات الحالية من الموقع الرئيسي
        const establishments = JSON.parse(localStorage.getItem('establishments') || '[]');
        const violations = JSON.parse(localStorage.getItem('violations') || '[]');
        const inspectedBuildings = JSON.parse(localStorage.getItem('inspectedBuildings') || '[]');
        
        // معالجة كل فحص جديد
        inspections.forEach(inspection => {
            // التحقق من وجود مخالفات
            const hasPayableViolations = Object.keys(inspection.violations).some(violationId => {
                return inspection.violations[violationId].options.some(opt => 
                    opt.isViolation && !opt.recordOnly
                );
            });
            
            const hasRecordOnlyViolations = Object.keys(inspection.violations).some(violationId => {
                return inspection.violations[violationId].options.some(opt => 
                    opt.isViolation && opt.recordOnly
                );
            });
            
            // إنشاء سجل المنشأة
            const establishmentRecord = {
                id: `EST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                ...inspection.establishment,
                address: inspection.address,
                inspector: inspection.inspector,
                inspectionDate: inspection.date,
                inspectionTime: inspection.time,
                visitNumber: inspection.visitNumber,
                establishmentPhotos: inspection.establishmentPhotos,
                status: hasPayableViolations ? 'pending' : 'inspected',
                timestamp: inspection.timestamp
            };
            
            // إضافة المنشأة
            establishments.push(establishmentRecord);
            
            // معالجة المخالفات
            if (hasPayableViolations || hasRecordOnlyViolations) {
                Object.keys(inspection.violations).forEach(violationId => {
                    const violationData = inspection.violations[violationId];
                    
                    if (violationData.options.length > 0) {
                        violationData.options.forEach(option => {
                            if (option.isViolation) {
                                const violationRecord = {
                                    id: `VIO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                                    establishmentId: establishmentRecord.id,
                                    violationType: violationId,
                                    optionValue: option.value,
                                    notes: violationData.notes,
                                    customText: violationData.customText || '',
                                    photos: violationData.photos || [],
                                    recordOnly: option.recordOnly || false,
                                    status: 'new',
                                    amount: option.recordOnly ? 0 : Math.floor(Math.random() * (3000 - 500 + 1)) + 500,
                                    paid: false,
                                    inspector: inspection.inspector,
                                    inspectionDate: inspection.date,
                                    timestamp: inspection.timestamp
                                };
                                
                                violations.push(violationRecord);
                            }
                        });
                    }
                });
            }
            
            // إضافة إلى المباني المفحوصة
            const inspectedRecord = {
                id: establishmentRecord.id,
                establishmentName: inspection.establishment.name,
                ownerName: inspection.establishment.ownerName,
                address: `${inspection.address.area}, ${inspection.address.governorate}`,
                inspector: inspection.inspector,
                inspectionDate: inspection.date,
                hasViolations: hasPayableViolations || hasRecordOnlyViolations,
                violationCount: Object.keys(inspection.violations).reduce((count, vId) => {
                    return count + inspection.violations[vId].options.filter(o => o.isViolation).length;
                }, 0),
                timestamp: inspection.timestamp
            };
            
            inspectedBuildings.push(inspectedRecord);
        });
        
        // حفظ البيانات المحدثة
        localStorage.setItem('establishments', JSON.stringify(establishments));
        localStorage.setItem('violations', JSON.stringify(violations));
        localStorage.setItem('inspectedBuildings', JSON.stringify(inspectedBuildings));
        
        // مسح بيانات الفحوصات المعالجة
        localStorage.setItem('inspections', '[]');
        
        return true;
    } catch (error) {
        console.error('Error syncing data:', error);
        return false;
    }
}

// تشغيل المزامنة عند تحميل الصفحة
if (typeof window !== 'undefined') {
    window.addEventListener('load', syncInspectionData);
    
    // مزامنة دورية كل 30 ثانية
    setInterval(syncInspectionData, 30000);
}

// تصدير للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { syncInspectionData };
}
