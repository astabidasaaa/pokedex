import React, { Fragment } from "react";

const PokedexDataTable = ({ pokemon }) => {
  return (
    <table className="w-full">
      <tbody>
        <tr>
          <th>Weight</th>
          <td>
            {pokemon.weight.minimum} - {pokemon.weight.maximum}
          </td>
        </tr>
        <tr>
          <th>Height</th>
          <td>
            {pokemon.height.minimum} - {pokemon.height.maximum}
          </td>
        </tr>
        <tr>
          <th>Max HP</th>
          <td>{pokemon.maxHP}</td>
        </tr>
        <tr>
          <th>Max CP</th>
          <td>{pokemon.maxCP}</td>
        </tr>
        <tr>
          <th>Flee Rate</th>
          <td>{pokemon.fleeRate}</td>
        </tr>
        <tr>
          <th>Fast Attack</th>
          <td>
            {pokemon.attacks.fast.map((attack) => {
              return (
                <Fragment key={attack.name}>
                  {attack.name}
                  <br />
                </Fragment>
              );
            })}
          </td>
        </tr>
        <tr>
          <th>Special Attack</th>
          <td>
            {pokemon.attacks.special.map((attack) => {
              return (
                <Fragment key={attack.name}>
                  {attack.name}
                  <br />
                </Fragment>
              );
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PokedexDataTable;
