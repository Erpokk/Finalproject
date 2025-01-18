const flattenFilters = (filters) => {
  const result = {};

  // Преобразование vehicleType в form
  const vehicleTypeKey = Object.keys(filters.vehicleType).find(
    (key) => filters.vehicleType[key] === true
  );
  if (vehicleTypeKey) {
    result.form = vehicleTypeKey; // Добавляем выбранный тип в результат
  }

  // Обработка transmission (automatic/manual)
  if (filters.vehicleEquipment.automatic) {
    result.transmission = "automatic";
  }

  // Преобразование vehicleEquipment
  Object.keys(filters.vehicleEquipment).forEach((key) => {
    // Добавляем только активные фильтры
    if (filters.vehicleEquipment[key] && key !== "automatic") {
      result[key] = true;
    }
  });

  if (filters.location && filters.location.trim() !== "") {
    result.location = filters.location.trim(); // Добавляем location в результат
  }

  return result;
};

export default flattenFilters;
