import '/styles/badges.css'

export const badgeColors = [
    'yellow',
    'orange',
    'pink',
    'red',
    'purple',
    'teal',
    'blue',
    'blue-dark',
    'green',
    'green-dark',
    'silver',
    'gold'
];
/**
 * createBadge generates an HTML string of a badge
 * @param {color, fa, faIcon, achievement} badge Details of the badge to be created
 * @returns An HTML string of the badge
 */
export const createBadge = (badge) => {
    /*
    <div class="badge yellow">
    <div class="circle"> <i class="fa fa-bolt"></i></div>
    <div class="ribbon">Initiator</div>
  </div>
    */
    const badgeHtml = `<div class="badge ${badge.color}">
   <div class="circle"> <i class="${badge.fa} fa-${badge.faIcon}"></i></div>
   <div class="ribbon">${badge.achievement}</div>
 </div>`
    return badgeHtml;
}

export const createBadgeContainer = () => {
    const badgeContainer = document.createElement('div');
    badgeContainer.id = 'badge-container';
    return badgeContainer;
}