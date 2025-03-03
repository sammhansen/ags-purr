const iconPath = "/home/lilith/.config/ags/assets/icons/profile.png";
const size = 150;

export function Avatar() {
	const css = `
    all: unset;
    background-image: url("${iconPath}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: ${size}px;
    min-width: ${size}px;
    border-radius: 8px;
  `;
	return <box css={css} />;
}
