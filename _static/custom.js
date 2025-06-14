function getClassOfCheckedCheckboxes(checkboxes) {
    var tags = [];
    checkboxes.forEach(function (cb) {
      if (cb.checked) {
        tags.push(cb.getAttribute("rel"));
      }
    });
    return tags;
  }
  
  function change() {
    console.log("Change event fired.");
    var domainsCbs = document.querySelectorAll(".domains input[type='checkbox']");
    var packagesCbs = document.querySelectorAll(".packages input[type='checkbox']");
  
    var domainTags = getClassOfCheckedCheckboxes(domainsCbs);
    var packageTags = getClassOfCheckedCheckboxes(packagesCbs);
  
    var filters = {
      domains: domainTags,
      packages: packageTags
    };
  
    filterResults(filters);
  }
  
  function filterResults(filters) {
    console.log("Filtering results...");
    var rElems = document.querySelectorAll(".tagged-card");
  
    rElems.forEach(function (el) {
      var isVisible = true; // Assume visible by default
  
      // Check if the element has any domain or package filter
      if (filters.domains.length > 0 || filters.packages.length > 0) {
        var hasMatchingDomain = filters.domains.length === 0 || filters.domains.some(domain => el.classList.contains(domain));
        var hasMatchingPackage = filters.packages.length === 0 || filters.packages.some(package => el.classList.contains(package));
  
        // The element should be visible if it matches any filter within each category
        isVisible = hasMatchingDomain && hasMatchingPackage;
      }
  
      // Toggle visibility based on the result
      if (isVisible) {
        el.classList.remove("d-none");
        el.classList.add("d-flex");
      } else {
        el.classList.remove("d-flex");
        el.classList.add("d-none");
      }
    });
  
    // Update the margins after filtering
    updateMargins();
  }
  
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", change);
  });
  
  function updateMargins() {
    const columns = document.querySelectorAll('.sd-col.sd-d-flex-row.docutils');
  
    columns.forEach(column => {
      // Check if this column has any visible cards
      const hasVisibleCard = Array.from(column.children).some(child => !child.classList.contains('d-none'));
  
      // Toggle a class based on whether there are visible cards
      if (hasVisibleCard) {
        column.classList.add('has-visible-card');
      } else {
        column.classList.remove('has-visible-card');
      }
    });
  }
  
  function clearCbs() {
    // Select all checkbox inputs and uncheck them
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });
  
    change(); 
  }
  
  // Initial call to set up correct margins when the page loads
  document.addEventListener('DOMContentLoaded', updateMargins);
  
  console.log("Script loaded.");
  